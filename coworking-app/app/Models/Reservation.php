<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'space_id',
        'start_time',
        'end_time',
        'type',
        'status',
        'total_price',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'total_price' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function space()
    {
        return $this->belongsTo(Space::class);
    }
    public static function hasConflict($spaceId, $startTime, $endTime, $excludeId = null): bool
    {

        return self::where('space_id', $spaceId)

            ->where('status', '!=', 'cancelled')

            ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))

            ->where(function ($query) use ($startTime, $endTime) {
                $query->whereBetween('start_time', [$startTime, $endTime])
                ->orWhereBetween('end_time', [$startTime, $endTime])

                ->orWhere(function ($q) use ($startTime, $endTime) {
                    $q->where('start_time', '<=', $startTime)
                      ->where('end_time', '>=', $endTime);

                });
            })
            ->exists();
    }

    

    
}
