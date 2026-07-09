<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Space extends Model
{
    protected $fillable = [
        'name',
        'type',
        'capacity',
        'price_par_heure',
        'price_par_demi_journee',
        'description',
        'is_available',
        'image',
        'is_open_space',
        // is_open_space permet de marquer un espace
        // comme open space avec places individuelles
    ];

    protected $casts = [
        'is_open_space' => 'boolean',
        // Cast en boolean pour que React reçoive
        // true/false et non 0/1
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    // Retourne les numéros de places déjà réservées
    // pour un créneau donné dans cet open space
    public function getOccupiedSeats($start, $end, $excludeId = null)
    {
        return $this->reservations()
            ->where('status', '!=', 'cancelled')
            ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
            ->where(function ($q) use ($start, $end) {
                $q->whereBetween('start_time', [$start, $end])
                  ->orWhereBetween('end_time', [$start, $end])
                  ->orWhere(function ($q) use ($start, $end) {
                      $q->where('start_time', '<=', $start)
                        ->where('end_time', '>=', $end);
                  });
            })
            ->whereNotNull('seat_number')
            ->pluck('seat_number')
            ->toArray();
        // pluck('seat_number') récupère uniquement
        // les numéros de places sous forme de tableau
    }
}