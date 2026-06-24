<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationReminder extends Mailable
{
    use Queueable, SerializesModels;

    // On déclare la réservation en public pour
    // qu'elle soit accessible dans la vue blade
    public Reservation $reservation;

    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            // Objet de l'email affiché dans la boîte mail
            subject: 'Rappel — Votre réservation commence dans 1 heure',
        );
    }

    public function content(): Content
    {
        return new Content(
            // Vue blade qu'on va créer à l'étape suivante
            view: 'emails.reservation-reminder',
        );
    }
}