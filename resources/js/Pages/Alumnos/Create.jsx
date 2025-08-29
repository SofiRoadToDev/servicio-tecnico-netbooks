import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { useState, useEffect } from 'react';
import EquipoForm from '@/Components/EquipoForm';

function AlumnoCreate({ alumno = null }) {
    const [crearEquipo, setCrearEquipo] = useState(false);
    const isEditing = alumno !== null;
    
    const { data, setData, post, put, processing, errors } = useForm({
        nombre: alumno?.nombre || '',
        apellido: alumno?.apellido || '',
        dni: alumno?.dni || '',
        // Campos para el equipo
        equipo_num_serie: alumno?.equipo?.[0].equipo_num_serie ||'',
        equipo_marca: alumno?.equipo?.[0].marca ||'',
        equipo_modelo: alumno?.equipo?.[0].modelo ||'',
        equipo_caracteristicas: alumno?.equipo?.[0].caracteristicas ||'',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('alumnos.update', alumno.id));
        } else {
            post(route('alumnos.store'));
        }
    };

    return (
        <>
            <Head title={isEditing ? "Editar Alumno" : "Crear Alumno"} />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg font-medium text-gray-900">
                    {isEditing ? "Editar Alumno" : "Crear Nuevo Alumno"}
                </h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="nombre" value="Nombre" />
                        <TextInput
                            id="nombre"
                            name="nombre"
                            value={data.nombre}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('nombre', e.target.value)}
                            required
                            isFocused
                        />
                        <InputError message={errors.nombre} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="apellido" value="Apellido" />
                        <TextInput
                            id="apellido"
                            name="apellido"
                            value={data.apellido}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('apellido', e.target.value)}
                            required
                        />
                        <InputError message={errors.apellido} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="dni" value="DNI" />
                        <TextInput
                            id="dni"
                            name="dni"
                            value={data.dni}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('dni', e.target.value)}
                            required
                        />
                        <InputError message={errors.dni} className="mt-2" />
                    </div>

                    {!isEditing && (
                        <>
                            <div className="mt-4">
                                <div className="flex items-center">
                                    <input
                                        id="crear_equipo"
                                        type="checkbox"
                                        checked={crearEquipo}
                                        onChange={() => setCrearEquipo(!crearEquipo)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="crear_equipo" className="ml-2 block text-sm text-gray-900">
                                        Agregar equipo para este alumno
                                    </label>
                                </div>
                            </div>

                            {crearEquipo && (
                                <EquipoForm data={data} setData={setData} errors={errors} />
                            )}
                        </>
                    )}

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            {isEditing ? "Actualizar" : "Guardar"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}

AlumnoCreate.layout = page => <AppLayout children={page} />;

export default AlumnoCreate;
