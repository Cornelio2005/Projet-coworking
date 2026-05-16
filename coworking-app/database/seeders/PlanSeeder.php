<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Flex',
                'prix_mensuel' => 150.00,
                'quota_heures' => 40,
                'acces_salles_reunion' => false,
                'tarif_reduit_pourcentage' => 10,
                'description' => 'Idéal pour un usage régulier en open space.',
            ],
            [
                'name' => 'Dédié',
                'prix_mensuel' => 350.00,
                'quota_heures' => null,
                'acces_salles_reunion' => true,
                'tarif_reduit_pourcentage' => 20,
                'description' => 'Un bureau dédié et accès illimité.',
            ],
            [
                'name' => 'Entreprise',
                'prix_mensuel' => 800.00,
                'quota_heures' => null,
                'acces_salles_reunion' => true,
                'tarif_reduit_pourcentage' => 30,
                'description' => 'Solution complète pour les équipes.',
            ],
        ];

        foreach ($plans as $plan) {
            \App\Models\Plan::create($plan);
        }
    }
}
