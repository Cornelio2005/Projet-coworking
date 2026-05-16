<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'description',
        'prix_mensuel',
        'quota_heures',
        'acces_salles_reunion',
        'tarif_reduit_pourcentage',
        'is_active',
    ];

    public function abonnements()
    {
        return $this->hasMany(Abonnement::class);
    }
}
