<?php

namespace Database\Seeders;

use App\Models\Equipment;
use Illuminate\Database\Seeder;

class EquipmentSeeder extends Seeder
{
    public function run(): void
    {
        $equipments = [
            [
                'name'      => 'Projecteur',
                'price'     => 15.00,
                'is_active' => true,
            ],
            [
                'name'      => 'Écran géant',
                'price'     => 20.00,
                'is_active' => true,
            ],
            [
                'name'      => 'Kit visio',
                'price'     => 25.00,
                'is_active' => true,
            ],
        ];

        foreach ($equipments as $equipment) {
            Equipment::create($equipment);
        }
    }
}