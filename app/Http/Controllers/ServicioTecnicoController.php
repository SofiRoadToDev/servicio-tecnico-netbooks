<?php

namespace App\Http\Controllers;

use App\Models\ServicioTecnico;
use App\Http\Controllers\Controller;
use App\Models\Alumno;
use App\Models\Equipo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicioTecnicoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ServicioTecnico::with(['alumno', 'equipo'])->orderBy('fecha', 'desc');
        
        // Filtrar por DNI de alumno si se proporciona
        if ($request->has('dni') && $request->dni) {
            $dni = $request->dni;
            $query->whereHas('alumno', function($q) use ($dni) {
                $q->where('dni', 'like', $dni . '%');
            });
        }
        
        $serviciosTecnicos = $query->paginate(10);
        
        return Inertia::render('ServicioTecnico/Index', [
            'serviciosTecnicos' => $serviciosTecnicos,
            'filters' => [
                'dni' => $request->dni ?? ''
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ServicioTecnico/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ServicioTecnico $servicioTecnico)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServicioTecnico $servicioTecnico)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ServicioTecnico $servicioTecnico)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServicioTecnico $servicioTecnico)
    {
        //
    }
}

