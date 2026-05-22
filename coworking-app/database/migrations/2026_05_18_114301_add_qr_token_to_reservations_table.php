<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->uuid('qr_token')->unique()->nullable()->after('total_price');
            // uuid() → génère un identifiant universel unique (ex: "550e8400-e29b-...")
            // unique() → deux réservations ne peuvent pas avoir le même token
            // nullable() → pour ne pas casser les réservations existantes en base
            // after('total_price') → place la colonne après total_price
        });
    }

    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn('qr_token');
            // Supprime la colonne si on rollback la migration
        });
    }
};