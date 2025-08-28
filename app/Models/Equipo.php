<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Equipo extends Model
{
    protected $fillable = [
        'num_serie',
        'marca',
        'modelo',
        'caracteristicas',
        'alumno_id',
    ];

    public function serviciosTecnicos(): HasMany
    {
        return $this->hasMany(ServicioTecnico::class);
    }
    
    public function alumno(): BelongsTo
    {
        return $this->belongsTo(Alumno::class);
    }
}
