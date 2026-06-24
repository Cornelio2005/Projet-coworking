<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('equipment_reservation', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')
                  ->constrained()
                  ->onDelete('cascade');
            $table->foreignId('equipment_id')
                  ->constrained()
                  ->onDelete('cascade');
            $table->integer('quantity')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment_reservation');
        Schema::dropIfExists('equipments');
    }
};