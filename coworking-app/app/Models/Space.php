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
    ];
    public function reservations()
{
    return $this->hasMany(Reservation::class);
}
}
