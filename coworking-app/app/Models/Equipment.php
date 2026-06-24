<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;
    protected $table = 'equipments';


    protected $fillable = ['name', 'price', 'is_active'];

    protected $casts = [
        'price'     => 'decimal:2',
        'is_active' => 'boolean',
    ];

    // Un équipement peut être lié à plusieurs réservations
    // via la table pivot equipment_reservation
    public function reservations()
    {
        return $this->belongsToMany(Reservation::class)
                    ->withPivot('quantity')
                    ->withTimestamps();
    }
}