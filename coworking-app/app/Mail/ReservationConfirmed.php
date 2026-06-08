<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;

class ReservationConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public Reservation $reservation;

    public function __construct(Reservation $reservation)
    {
        // On stocke la réservation pour y accéder dans le template
        $this->reservation = $reservation;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmation de votre réservation — Cowork\'In',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.reservation-confirmed',
            with: [
                // On passe la réservation au template email
                'reservation' => $this->reservation,
            ],
        );
    }

    public function attachments(): array
    {
        // On génère le PDF en mémoire et on l'attache à l'email
        $pdf = Pdf::loadView('billing.invoice', [
            'reservation' => $this->reservation,
        ]);

        return [
            Attachment::fromData(
                fn () => $pdf->output(),
                'facture-reservation-' . $this->reservation->id . '.pdf'
            )->withMime('application/pdf'),
        ];
    }
}