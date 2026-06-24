<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Space;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class CartController extends Controller
{
 public function add(Request $request)
{
    $validated = $request->validate([
        'space_id'       => 'required|exists:spaces,id',
        'start_datetime' => 'required|date|after:now',
        'end_datetime'   => 'required_if:type,heure|nullable|date|after:start_datetime',
        'type'           => 'required|in:heure,demi-journee',
        // equipments est optionnel — tableau d'IDs d'équipements
        'equipments'     => 'nullable|array',
        'equipments.*'   => 'exists:equipments,id',
    ]);

    $start = Carbon::parse($validated['start_datetime']);
    $end = $validated['type'] === 'heure'
        ? Carbon::parse($validated['end_datetime'])
        : $start->copy()->addHours(4);

    if (Reservation::hasConflict($validated['space_id'], $start, $end)) {
        return back()->withErrors([
            'start_datetime' => 'Ce créneau est déjà réservé pour cet espace.',
        ]);
    }

    $space = Space::findOrFail($validated['space_id']);

    $totalPrice = match($validated['type']) {
        'heure'        => $space->price_par_heure * $start->diffInHours($end),
        'demi-journee' => $space->price_par_demi_journee ?? ($space->price_par_heure * 4),
    };

    $reduction = auth()->user()->getReductionTarif();
    if ($reduction > 0) {
        $totalPrice = $totalPrice * (1 - ($reduction / 100));
    }

    // Si des équipements sont sélectionnés on calcule leur prix total
    $equipmentIds = $validated['equipments'] ?? [];
    $equipmentPrice = 0;

    if (!empty($equipmentIds)) {
        $equipmentPrice = \App\Models\Equipment::whereIn('id', $equipmentIds)
            ->sum('price');
        // On ajoute le prix des équipements au total
        $totalPrice += $equipmentPrice;
    }

    $cart = session('cart', []);

    $cart[] = [
        'id'           => uniqid(),
        'space_id'     => $space->id,
        'space_name'   => $space->name,
        'start_time'   => $start->toDateTimeString(),
        'end_time'     => $end->toDateTimeString(),
        'type'         => $validated['type'],
        'total_price'  => round($totalPrice, 2),
        // On stocke les IDs en session pour les attacher au checkout
        'equipment_ids' => $equipmentIds,
    ];

    session(['cart' => $cart]);

    return redirect()->route('cart.index')
        ->with('success', 'Espace ajouté au panier !');
}

    public function index()
    {
        $cart = session('cart', []);

        return Inertia::render('Cart/Index', [
            'cart'  => $cart,
            'total' => round(array_sum(array_column($cart, 'total_price')), 2),
        ]);
    }

    public function remove(string $id)
    {
        $cart = session('cart', []);

        // On filtre pour garder tout sauf l'item avec cet id
        $cart = array_values(array_filter($cart, fn($item) => $item['id'] !== $id));

        session(['cart' => $cart]);

        return redirect()->route('cart.index');
    }

public function checkout(Request $request)
{
    $cart = session('cart', []);

    if (empty($cart)) {
        return back()->withErrors(['cart' => 'Votre panier est vide.']);
    }

    foreach ($cart as $item) {
        $start = Carbon::parse($item['start_time']);
        $end   = Carbon::parse($item['end_time']);

        if (Reservation::hasConflict($item['space_id'], $start, $end)) {
            continue;
        }

        $reservation = Reservation::create([
            'user_id'     => auth()->id(),
            'space_id'    => $item['space_id'],
            'start_time'  => $start,
            'end_time'    => $end,
            'type'        => $item['type'],
            'status'      => 'pending',
            'total_price' => $item['total_price'],
        ]);

        // Si des équipements sont associés à cet item
        // on les attache à la réservation via la table pivot
        if (!empty($item['equipment_ids'])) {
            $reservation->equipments()->attach($item['equipment_ids']);
        }
    }

    session()->forget('cart');

    return redirect()->route('reservations.index')
        ->with('success', 'Commande validée ! Vos réservations ont été créées.');
}
}