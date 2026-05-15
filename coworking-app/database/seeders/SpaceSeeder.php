<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Space;

class SpaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $spaces = [
            [
                'name' => 'L\'Atelier (Open Space)',
                'type' => 'espace ouvert',
                'capacity' => 12,
                'price_par_heure' => 5.00,
                'description' => 'Un espace ouvert lumineux et inspirant, idéal pour le travail collaboratif et le networking.',
                'is_available' => true,
            ],
            [
                'name' => 'Le Bunker',
                'type' => 'bureau',
                'capacity' => 2,
                'price_par_heure' => 15.00,
                'description' => 'Bureau privé insonorisé pour une concentration maximale ou des appels importants.',
                'is_available' => true,
            ],
            [
                'name' => 'Salle Apollo',
                'type' => 'salle de réunion',
                'capacity' => 8,
                'price_par_heure' => 25.00,
                'description' => 'Salle de réunion toute équipée (écran interactif, pieuvre audio) pour vos présentations et brainstorming.',
                'is_available' => true,
            ],
            [
                'name' => 'Le Panorama',
                'type' => 'bureau',
                'capacity' => 4,
                'price_par_heure' => 20.00,
                'description' => 'Bureau privé spacieux avec vue imprenable sur la ville.',
                'is_available' => false,
            ],
        ];

        foreach ($spaces as $space) {
            Space::create($space);
        }
    }
}
