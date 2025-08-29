<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Alumnos/Index', [
            'alumnos' => Alumno::orderBy('apellido')->paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return Inertia::render('Alumnos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:30',
            'apellido' => 'required|string|max:30',
            'dni' => 'required|string|max:8',
        ]);

        $alumno = Alumno::create($validated);

        // Si se enviaron datos de equipo, crear el equipo asociado
        if ($request->has('equipo_num_serie') && $request->equipo_num_serie) {
            $equipoData = $request->validate([
                'equipo_num_serie' => 'required|string|max:50',
                'equipo_marca' => 'required|string|max:30',
                'equipo_modelo' => 'required|string|max:30',
                'equipo_caracteristicas' => 'required|string',
            ]);

            $alumno->equipos()->create([
                'num_serie' => $equipoData['equipo_num_serie'],
                'marca' => $equipoData['equipo_marca'],
                'modelo' => $equipoData['equipo_modelo'],
                'caracteristicas' => $equipoData['equipo_caracteristicas'],
                'alumno_id' => $alumno->id,
            ]);
        }

        return redirect()->route('alumnos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Alumno $alumno)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alumno $alumno)
    {
        return Inertia::render('Alumnos/Create', [
            'alumno' =>$alumno->load('equipos'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Alumno $alumno)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alumno $alumno)
    {
        //
    }

    public function buscarPorDni($dni)
    {
        $alumno = Alumno::where('dni', $dni)->with('equipos')->first();

        if (!$alumno) {
            return response()->json(['message' => 'Alumno no encontrado'], 404);
        }

        return response()->json($alumno);
    }
}
