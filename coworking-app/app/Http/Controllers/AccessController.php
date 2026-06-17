<?php

namespace App\Http\Controllers;
use App\Models\Reservation;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AccessController extends Controller
{
    public function verify(String $qr_token)
    {
        //On recherche la reservation
        $reservation=Reservation::where('qr_token', $qr_token)
        ->with('space','user')
        ->first();

        //Si aucune reservation n'est pas confirmée donc l'acces est refusée
        if(!$reservation) {
            return Inertia::render('AccessDenied', [
                'reason' => 'Token invalide ou reservation non trouvée.'
            ]);
        }

        //Ici on vérifie la réservation n'est pas confirmée, si c'est le cas accès refusé
        if ($reservation->status !== 'confirmed') {
            return Inertia::render('AccessDenied', [
                'reason' => 'Réservation non confirmée.'
            ]);
        }

        //On vérifie si la réservation est en cours aujourd'hui
        $now = Carbon::now();
        $start = Carbon::parse($reservation->start_time);
        $end = Carbon::parse($reservation->end_time);

        if ($now->lt($start) || $now->gt($end) ) {
            return Inertia::render('AccessDenied', [
                'reason' => 'Réservation pas encore commencée ou expirée.'
            ]);
        }

        //En fin, on autorise l'accès
        return Inertia::render('AccessGranted', [
            'reservation' => [
                'id'        => $reservation->id,
                'space_name' => $reservation->space->name,
                'user_name'  => $reservation->user->name,
                'start_time' => $reservation->start_time->format('H:i'),
                'end_time'   => $reservation->end_time->format('H:i'),
            ],
        ]);

    }
}
