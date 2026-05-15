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
        'description',
        'is_available',
    ];
}
