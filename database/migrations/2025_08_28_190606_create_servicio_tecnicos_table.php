<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('servicio_tecnicos', function (Blueprint $table) {
            $table->id();
            $table->dateTime('fecha');
            $table->foreignId('alumno_id')->constrained('alumnos')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('equipo_id')->constrained('equipos')->onUpdate('cascade')->onDelete('cascade');
            $table->text('motivo');
            $table->enum('estado', ['ticket_generado', 'retirado_por_correo', 'devuelto_reparado', 'devuelto_sin_reparar'])->default('ticket_generado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('servicio_tecnicos');
    }
};
