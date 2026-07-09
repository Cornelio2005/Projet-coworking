<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Ajout des champs open space sur la table spaces
        Schema::table('spaces', function (Blueprint $table) {
            $table->boolean('is_open_space')->default(false)->after('capacity');
            // is_open_space → true si l'espace est un open space
            // false par défaut pour ne pas casser les espaces existants
        });

        // Ajout du numéro de place sur la table reservations
        Schema::table('reservations', function (Blueprint $table) {
            $table->unsignedTinyInteger('seat_number')->nullable()->after('type');
            // seat_number → numéro de la place choisie
            // nullable car les espaces non open space n'ont pas de place
        });
    }

    public function down(): void
    {
        Schema::table('spaces', function (Blueprint $table) {
            $table->dropColumn('is_open_space');
        });

        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn('seat_number');
        });
    }
};