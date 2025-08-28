<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Equipo extends Model
{
    protected $fillable = [
        'num_serie',
        'marca',
        'modelo',
        'caracteristicas',
    ];

    public function serviciosTecnicos(): HasMany
    {
        return $this->hasMany(ServicioTecnico::class);
    }
}
