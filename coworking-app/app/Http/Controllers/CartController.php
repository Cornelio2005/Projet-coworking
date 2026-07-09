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
        $space = Space::findOrFail($request->input('space_id'));

        $validated = $request->validate([
            'space_id'       => 'required|exists:spaces,id',
            'start_datetime' => 'required|date|after:now',
            'end_datetime'   => 'required_if:type,heure|nullable|date|after:start_datetime',
            'type'           => 'required|in:heure,demi-journee',
            'equipments'     => 'nullable|array',
            'equipments.*'   => 'exists:equipments,id',
            'seat_number'    => $space->is_open_space ? 'required|integer|min:1' : 'nullable|integer|min:1',
        ]);

        $start = Carbon::parse($validated['start_datetime']);
        $end = $validated['type'] === 'heure'
            ? Carbon::parse($validated['end_datetime'])
            : $start->copy()->addHours(4);

        $seatNumber = $validated['seat_number'] ?? null;

        if (Reservation::hasConflict($validated['space_id'], $start, $end, null, $seatNumber)) {
            return back()->withErrors([
                'start_datetime' => $space->is_open_space
                    ? 'Cette place est déjà réservée sur ce créneau.'
                    : 'Ce créneau est déjà réservé pour cet espace.',
            ]);
        }

        $totalPrice = match($validated['type']) {
            'heure'        => $space->price_par_heure * $start->diffInHours($end),
            'demi-journee' => $space->price_par_demi_journee ?? ($space->price_par_heure * 4),
        };

        $reduction = auth()->user()->getReductionTarif();
        if ($reduction > 0) {
            $totalPrice = $totalPrice * (1 - ($reduction / 100));
        }

        $equipmentIds = $validated['equipments'] ?? [];
        $equipmentPrice = 0;

        if (!empty($equipmentIds)) {
            $equipmentPrice = \App\Models\Equipment::whereIn('id', $equipmentIds)->sum('price');
            $totalPrice += $equipmentPrice;
        }

        $cart = session('cart', []);

        $cart[] = [
            'id'            => uniqid(),
            'space_id'      => $space->id,
            'space_name'    => $space->name,
            'start_time'    => $start->toDateTimeString(),
            'end_time'      => $end->toDateTimeString(),
            'type'          => $validated['type'],
            'total_price'   => round($totalPrice, 2),
            'equipment_ids' => $equipmentIds,
            'seat_number'   => $seatNumber,
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
            $seatNumber = $item['seat_number'] ?? null;

            if (Reservation::hasConflict($item['space_id'], $start, $end, null, $seatNumber)) {
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
                'seat_number' => $seatNumber,
            ]);

            if (!empty($item['equipment_ids'])) {
                $reservation->equipments()->attach($item['equipment_ids']);
            }
        }

        session()->forget('cart');

        return redirect()->route('reservations.index')
            ->with('success', 'Commande validée ! Vos réservations ont été créées.');
    }
}