<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Space;
use App\Models\Equipment;
use App\Models\Reservation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * DemoSeeder — prépare toutes les données nécessaires à la démonstration
 * de soutenance Cowork'In : comptes utilisateurs, espaces, équipements,
 * et une réservation "filet de sécurité" déjà confirmée.
 *
 * Utilise firstOrCreate/updateOrCreate partout : le seeder est idempotent,
 * tu peux le relancer plusieurs fois sans dupliquer les données.
 *
 * Lancement :
 *   php artisan db:seed --class=DemoSeeder
 *
 * Si tu préfères repartir d'une base 100% vierge avant la démo :
 *   php artisan migrate:fresh
 *   php artisan db:seed --class=DemoSeeder
 */
class DemoSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('--- Création des comptes utilisateurs ---');

        // ─────────────────────────────────────────────
        // ADMIN
        // ─────────────────────────────────────────────
        User::updateOrCreate(
            ['email' => 'admin@coworkin.fr'],
            [
                'name'              => 'Admin',
                'password'          => Hash::make('admin1234'),
                'role'              => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // ─────────────────────────────────────────────
        // MANAGER — Sophia
        // ─────────────────────────────────────────────
        User::updateOrCreate(
            ['email' => 'sophia@coworkin.fr'],
            [
                'name'              => 'Sophia Girard',
                'password'          => Hash::make('sophia1234'),
                'role'              => 'manager',
                'email_verified_at' => now(),
            ]
        );

        // ─────────────────────────────────────────────
        // CLIENT — Léa (compte de secours pour le scénario de conflit de place)
        // ─────────────────────────────────────────────
        $lea = User::updateOrCreate(
            ['email' => 'lea@coworkin.fr'],
            [
                'name'              => 'Léa Martin',
                'password'          => Hash::make('lea123456'),
                'role'              => 'client',
                'email_verified_at' => now(),
            ]
        );

        // ─────────────────────────────────────────────
        // MEMBER — Karim (abonné, pour montrer la réduction tarifaire)
        // ⚠️ Adapte cette partie selon ton vrai modèle d'abonnement
        // (nom des tables/relations : Plan, Abonnement, etc.)
        // ─────────────────────────────────────────────
        $karim = User::updateOrCreate(
            ['email' => 'karim@coworkin.fr'],
            [
                'name'              => 'Karim Haddad',
                'password'          => Hash::make('karim1234'),
                'role'              => 'member',
                'email_verified_at' => now(),
            ]
        );

        // Si tu as un modèle Plan / Abonnement, décommente et adapte :
        //
        // $plan = \App\Models\Plan::firstOrCreate(
        //     ['name' => 'Pass Mensuel'],
        //     ['tarif_reduit_pourcentage' => 20, 'price' => 49.90]
        // );
        //
        // \App\Models\Abonnement::updateOrCreate(
        //     ['user_id' => $karim->id],
        //     [
        //         'plan_id'    => $plan->id,
        //         'start_date' => now()->subDays(10),
        //         'end_date'   => now()->addDays(20),
        //         'status'     => 'active',
        //     ]
        // );

        // ⚠️ NOTE IMPORTANTE : ne PAS créer le compte de Rémi ici.
        // Rémi doit être inscrit EN DIRECT pendant la démo (Acte 1, étape 1).
        // Si tu veux quand même un filet de sécurité au cas où l'inscription
        // live échoue, décommente ci-dessous :
        //
        // User::updateOrCreate(
        //     ['email' => 'remi@coworkin.fr'],
        //     [
        //         'name'              => 'Rémi Dubois',
        //         'password'          => Hash::make('remi12345'),
        //         'role'              => 'client',
        //         'email_verified_at' => now(),
        //     ]
        // );

        $this->command->info('--- Création des espaces ---');

        // ─────────────────────────────────────────────
        // ESPACE OPEN SPACE — celui que Rémi va réserver
        // ─────────────────────────────────────────────
        $openSpace = Space::updateOrCreate(
            ['name' => 'Espace Coworking Central'],
            [
                'description'             => "Grand open space lumineux avec 6 postes de travail équipés, idéal pour le travail en autonomie ou les appels clients.",
                'type'                    => 'bureau_partage',
                'capacity'                => 6,
                'price_par_heure'         => 8.00,
                'price_par_demi_journee'  => 25.00,
                'is_available'            => true,
                'is_open_space'           => true,
                // 'image' => 'spaces/open-space.jpg', // décommente si tu as uploadé une image dans storage
            ]
        );

        // ─────────────────────────────────────────────
        // BUREAU INDIVIDUEL
        // ─────────────────────────────────────────────
        Space::updateOrCreate(
            ['name' => 'Bureau Zen'],
            [
                'description'             => "Bureau individuel calme, parfait pour se concentrer sur une tâche exigeante.",
                'type'                    => 'bureau_individuel',
                'capacity'                => 1,
                'price_par_heure'         => 12.00,
                'price_par_demi_journee'  => 40.00,
                'is_available'            => true,
                'is_open_space'           => false,
            ]
        );

        // ─────────────────────────────────────────────
        // SALLE DE RÉUNION
        // ─────────────────────────────────────────────
        Space::updateOrCreate(
            ['name' => 'Salle Innovation'],
            [
                'description'             => "Salle de réunion équipée pour vos présentations et brainstormings d'équipe.",
                'type'                    => 'salle_reunion',
                'capacity'                => 8,
                'price_par_heure'         => 20.00,
                'price_par_demi_journee'  => 70.00,
                'is_available'            => true,
                'is_open_space'           => false,
            ]
        );

        $this->command->info('--- Création des équipements ---');

        // ─────────────────────────────────────────────
        // ÉQUIPEMENTS
        // ─────────────────────────────────────────────
        Equipment::updateOrCreate(
            ['name' => 'Vidéoprojecteur'],
            ['price' => 5.00, 'is_active' => true]
        );

        Equipment::updateOrCreate(
            ['name' => 'Écran secondaire'],
            ['price' => 3.00, 'is_active' => true]
        );

        Equipment::updateOrCreate(
            ['name' => 'Kit visioconférence'],
            ['price' => 8.00, 'is_active' => true]
        );

        $this->command->info('--- Création de la réservation de secours ---');

        // ─────────────────────────────────────────────
        // RÉSERVATION "FILET DE SÉCURITÉ"
        // Déjà confirmée, sur un créneau qui couvre "maintenant".
        // À utiliser si le scénario live (Rémi) plante ou prend trop
        // de retard : bascule directement sur le compte Léa pour
        // montrer QR code + facture + accès sans tout refaire.
        //
        // ⚠️ Pense à relancer ce seeder juste avant la démo pour que
        // le créneau (now()) soit bien à l'heure de la soutenance.
        // ─────────────────────────────────────────────
        Reservation::updateOrCreate(
            [
                'user_id'  => $lea->id,
                'space_id' => $openSpace->id,
            ],
            [
                'start_time'  => now()->subMinutes(10),
                'end_time'    => now()->addHours(3),
                'type'        => 'heure',
                'status'      => 'confirmed',
                'total_price' => 16.00,
                'seat_number' => 5,
            ]
        );

        $this->command->info('--- Terminé ! Comptes disponibles : ---');
        $this->command->table(
            ['Rôle', 'Email', 'Mot de passe'],
            [
                ['admin',   'admin@coworkin.fr',  'admin1234'],
                ['manager', 'sophia@coworkin.fr', 'sophia1234'],
                ['client',  'lea@coworkin.fr',    'lea123456'],
                ['member',  'karim@coworkin.fr',  'karim1234'],
            ]
        );
    }
}