<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Alumno extends Model
{
    protected $fillable = [
        'apellido',
        'nombre',
        'dni',
    ];

    public function serviciosTecnicos(): HasMany
    {
        return $this->hasMany(ServicioTecnico::class);
    }
    
    public function equipos(): HasMany
    {
        return $this->hasMany(Equipo::class);
    }
}
