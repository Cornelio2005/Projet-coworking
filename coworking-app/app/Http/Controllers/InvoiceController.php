<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Mail\ReservationConfirmed;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;

class InvoiceController extends Controller
{
    // Télécharge la facture PDF directement dans le navigateur
    public function download(Reservation $reservation)
    {
        // On charge les relations nécessaires pour le template
        $reservation->load('user', 'space');

        $pdf = Pdf::loadView('billing.invoice', [
            'reservation' => $reservation,
        ]);

        return $pdf->download('facture-reservation-' . $reservation->id . '.pdf');
    }

    // Envoie l'email de confirmation avec la facture en pièce jointe
    public static function sendConfirmationEmail(Reservation $reservation)
    {
        // On charge les relations nécessaires pour le template email et PDF
        $reservation->load('user', 'space');

        Mail::to($reservation->user->email)
            ->send(new ReservationConfirmed($reservation));
    }
}