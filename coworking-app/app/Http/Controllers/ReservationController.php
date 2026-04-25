<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Space;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {

        $reservations = auth()->user()->isAdmin()
            ? Reservation::with(['user', 'space'])->latest()->get()
            
            : Reservation::with('space')

            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Reservations/Index',[
            'reservations' => $reservations,
        ]);
    }

    public function create()
    {
        $spaces = Space::where('is_available', true)
        ->get();

        return Inertia::render('Reservations/Create', [
            'spaces' => $spaces,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'space_id' => 'required|exists:spaces,id',
            'start_datetime' => 'required|date|after:now',
            'type' => 'required|in:heure,demi-journee',
        ]);
        
        $start = Carbon::parse($validated['start_datetime']);
        // Carbon::parse() convertit la string de date
        // en objet Carbon manipulable.

        $end = match($validated['type']) {
            'heure'   => $start->copy()->addHour(),
            // addHour() ajoute 1 heure à la date de début
            // copy() évite de modifier l'objet $start original.

            'demi-journee' => $start->copy()->addHours(4),
            // Une demi-journée = 4 heures.
        };
              if (Reservation::hasConflict($validated['space_id'], $start, $end)) {
            return back()->withErrors([
                'start_datetime' => 'Ce créneau est déjà réservé pour cet espace.',
                // back() redirige vers le formulaire.
                // withErrors() renvoie l'erreur au composant
                // React qui peut l'afficher sous le champ.
            ]);
        }

              $space = Space::findOrFail($validated['space_id']);
        // findOrFail() récupère l'espace ou retourne
        // une erreur 404 automatiquement s'il n'existe pas.

        $totalPrice = match($validated['type']) {
            'hourly'   => $space->price_per_hour,
            // Pour une réservation horaire, le prix
            // est simplement le tarif à l'heure.

            'half_day' => $space->price_per_half_day,
            // Pour une demi-journée, on utilise
            // le tarif demi-journée.
        };

        Reservation::create([
            'user_id'        => auth()->id(),
            'space_id'       => $validated['space_id'],
            'start_datetime' => $start,
            'end_datetime'   => $end,
            'type'           => $validated['type'],
            'status'         => 'pending',
            'total_price'    => $totalPrice,
        ]);

        return redirect()->route('reservations.index')
            ->with('success', 'Réservation effectuée avec succès !');
    }

    public function cancel(Reservation $reservation)
    {

        if (!auth()->user()->isAdmin() && $reservation->user_id !== auth()->id()) {
            abort(403);
        }

        $reservation->update(['status' => 'cancelled']);

        return redirect()->route('reservations.index')
            ->with('success', 'Réservation annulée.');
    }

    public function confirm(Reservation $reservation)
    {

        $reservation->update(['status' => 'confirmed']);

        return redirect()->route('reservations.index')
        ->with('success', 'Réservation confirmée.');
    }
}
