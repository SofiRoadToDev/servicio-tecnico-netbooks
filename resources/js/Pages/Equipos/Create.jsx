import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { useState, useEffect } from 'react';
import axios from 'axios';

function EquipoCreate({ equipo = null }) {
    const isEditing = equipo !== null;
    const [searchError, setSearchError] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    
    const { data, setData, post, put, processing, errors } = useForm({
        num_serie: equipo?.num_serie || '',
        marca: equipo?.marca || '',
        modelo: equipo?.modelo || '',
        caracteristicas: equipo?.caracteristicas || '',
        alumno_dni: equipo?.alumno?.dni || '',
        alumno_id: equipo?.alumno_id || '',
        alumno_nombre_apellido: equipo?.alumno ? `${equipo.alumno.apellido}, ${equipo.alumno.nombre}` : '',
    });

    // Efecto para buscar alumno cuando cambia el DNI
    useEffect(() => {
        if (data.alumno_dni && data.alumno_dni.length >= 7) {
            if (searchTimeout) clearTimeout(searchTimeout);
            
            const timeout = setTimeout(() => {
                handleSearch();
            }, 500);
            
            setSearchTimeout(timeout);
        }
        
        return () => {
            if (searchTimeout) clearTimeout(searchTimeout);
        };
    }, [data.alumno_dni]);

    // Función para buscar alumno por DNI
    const handleSearch = async () => {
        setSearchError('');
        if (!data.alumno_dni) {
            setSearchError('Por favor, ingrese el DNI del alumno.');
            return;
        }

        try {
            const response = await axios.get(route('alumnos.buscarPorDni', data.alumno_dni));
            const alumno = response.data;

            setData((prevData) => ({
                ...prevData,
                alumno_id: alumno.id,
                alumno_nombre_apellido: `${alumno.apellido}, ${alumno.nombre}`,
            }));
            setSearchError('');
        } catch (error) {
            console.error('Error buscando alumno:', error);
            setSearchError('Alumno no encontrado.');
            setData((prevData) => ({
                ...prevData,
                alumno_id: '',
                alumno_nombre_apellido: '',
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.alumno_id) {
            setSearchError('Debe seleccionar un alumno para asociar al equipo.');
            return;
        }
        
        if (isEditing) {
            put(route('equipos.update', equipo.id));
        } else {
            post(route('equipos.store'));
        }
    };

    return (
        <>
            <Head title={isEditing ? "Editar Equipo" : "Crear Equipo"} />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg font-medium text-gray-900">
                    {isEditing ? "Editar Equipo" : "Crear Nuevo Equipo"}
                </h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    {/* Búsqueda de alumno por DNI */}
                    <div>
                        <InputLabel htmlFor="alumno_dni" value="DNI del Alumno" />
                        <div className="flex">
                            <TextInput
                                id="alumno_dni"
                                name="alumno_dni"
                                value={data.alumno_dni}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('alumno_dni', e.target.value)}
                                required
                                isFocused
                                placeholder="Ingrese el DNI del alumno"
                            />
                            <PrimaryButton
                                type="button"
                                className="ml-2 mt-1"
                                onClick={handleSearch}
                            >
                                Buscar
                            </PrimaryButton>
                        </div>
                        {searchError && <p className="text-red-500 text-sm mt-1">{searchError}</p>}
                        <InputError message={errors.alumno_dni} className="mt-2" />
                    </div>

                    {/* Mostrar nombre del alumno encontrado */}
                    {data.alumno_nombre_apellido && (
                        <div>
                            <InputLabel htmlFor="alumno_nombre_apellido" value="Alumno" />
                            <TextInput
                                id="alumno_nombre_apellido"
                                name="alumno_nombre_apellido"
                                value={data.alumno_nombre_apellido}
                                className="mt-1 block w-full bg-gray-100"
                                readOnly
                                disabled
                            />
                            <input type="hidden" name="alumno_id" value={data.alumno_id} />
                        </div>
                    )}

                    <div>
                        <InputLabel htmlFor="num_serie" value="Número de Serie" />
                        <TextInput
                            id="num_serie"
                            name="num_serie"
                            value={data.num_serie}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('num_serie', e.target.value)}
                            required
                        />
                        <InputError message={errors.num_serie} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="marca" value="Marca" />
                        <TextInput
                            id="marca"
                            name="marca"
                            value={data.marca}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('marca', e.target.value)}
                            required
                        />
                        <InputError message={errors.marca} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="modelo" value="Modelo" />
                        <TextInput
                            id="modelo"
                            name="modelo"
                            value={data.modelo}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('modelo', e.target.value)}
                            required
                        />
                        <InputError message={errors.modelo} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="caracteristicas" value="Características" />
                        <textarea
                            id="caracteristicas"
                            name="caracteristicas"
                            value={data.caracteristicas}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('caracteristicas', e.target.value)}
                            required
                        />
                        <InputError message={errors.caracteristicas} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Guardar</PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}

EquipoCreate.layout = page => <AppLayout children={page} />;

export default EquipoCreate;
