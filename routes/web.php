<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnoController;
use Inertia\Inertia;
use App\Http\Controllers\ServicioTecnicoController;
use App\Http\Controllers\EquipoController;


Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware('auth')->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::resource('alumnos', AlumnoController::class);
    Route::resource('equipos', EquipoController::class);
    Route::resource('serviciotecnico', ServicioTecnicoController::class);
    Route::get('/alumnos/buscar/{dni}', [AlumnoController::class, 'buscarPorDni'])->name('alumnos.buscarPorDni');
});

require __DIR__.'/auth.php';
