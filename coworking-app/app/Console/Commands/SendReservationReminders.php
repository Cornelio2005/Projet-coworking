<?php

namespace App\Console\Commands;

use App\Mail\ReservationReminder;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendReservationReminders extends Command
{
    // Nom de la commande appelée par le Scheduler
    protected $signature = 'reservations:send-reminders';

    // Description affichée dans php artisan list
    protected $description = 'Envoie un email de rappel 1h avant chaque réservation confirmée';

    public function handle(): void
    {
        $now = Carbon::now();

        // On cherche les réservations qui commencent
        // entre 59 et 61 minutes à partir de maintenant.
        // La fenêtre de 2 minutes évite de rater une réservation
        // si le scheduler tourne avec quelques secondes de décalage.
        $reservations = Reservation::with(['user', 'space'])
            ->where('status', 'confirmed')
            ->whereBetween('start_time', [
                $now->copy()->addMinutes(59),
                $now->copy()->addMinutes(61),
            ])
            ->get();

        foreach ($reservations as $reservation) {
            Mail::to($reservation->user->email)
                ->send(new ReservationReminder($reservation));

            // On affiche un log dans le terminal pour confirmer l'envoi
            $this->info("Rappel envoyé à {$reservation->user->email} pour la réservation #{$reservation->id}");
        }

        $this->info("Terminé — {$reservations->count()} rappel(s) envoyé(s).");
    }
}