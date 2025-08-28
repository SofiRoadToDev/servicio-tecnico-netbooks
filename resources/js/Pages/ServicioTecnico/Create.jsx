import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ServicioTecnicoCreate() {
    const { data, setData, post, processing, errors } = useForm({
        fecha: '',
        alumno_id: '',
        equipo_id: '',
        motivo: '',
        estado: 'ticket_generado', // Default value
        alumno_dni: '', // Field for DNI input
        alumno_nombre_apellido: '', // Field for display
        equipo_num_serie: '', // Field for display
    });

    const [searchError, setSearchError] = useState(''); // State for search errors
    const [dniTimeout, setDniTimeout] = useState(null); // Timeout for DNI search

    // Efecto para buscar alumno cuando cambia el DNI
    useEffect(() => {
        if (data.alumno_dni && data.alumno_dni.length >= 7) {
            // Limpiar timeout anterior si existe
            if (dniTimeout) clearTimeout(dniTimeout);
            
            // Crear nuevo timeout para evitar múltiples búsquedas mientras se escribe
            const timeout = setTimeout(() => {
                handleSearch();
            }, 500);
            
            setDniTimeout(timeout);
        }
        
        return () => {
            if (dniTimeout) clearTimeout(dniTimeout);
        };
    }, [data.alumno_dni]);

    const handleSearch = async () => {
        setSearchError(''); // Clear previous errors
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
                equipo_id: alumno.equipos.length > 0 ? alumno.equipos[0].id : '', // Assuming one equipment for now
                equipo_num_serie: alumno.equipos.length > 0 ? alumno.equipos[0].num_serie : '',
            }));
            setSearchError('');
        } catch (error) {
            console.error('Error searching alumno:', error);
            setSearchError('Alumno no encontrado o sin equipo asociado.');
            setData((prevData) => ({
                ...prevData,
                alumno_id: '',
                alumno_nombre_apellido: '',
                equipo_id: '',
                equipo_num_serie: '',
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('serviciotecnico.store'));
    };

    return (
        <>
            <Head title="Crear Servicio Técnico" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg font-medium text-gray-900">Crear Nuevo Servicio Técnico</h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    {/* Fecha Input */}
                    <div>
                        <InputLabel htmlFor="fecha" value="Fecha" />
                        <input
                            type="datetime-local"
                            id="fecha"
                            name="fecha"
                            value={data.fecha}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('fecha', e.target.value)}
                            required
                        />
                        <InputError message={errors.fecha} className="mt-2" />
                    </div>

                    {/* Alumno DNI Input */}
                    <div>
                        <InputLabel htmlFor="alumno_dni" value="DNI del Alumno" />
                        <TextInput
                            id="alumno_dni"
                            name="alumno_dni"
                            value={data.alumno_dni}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('alumno_dni', e.target.value)}
                            required
                        />
                        <InputError message={errors.alumno_dni || searchError} className="mt-2" />
                        <div className="text-xs text-gray-500 mt-1">
                            Ingrese el DNI completo para buscar automáticamente
                        </div>
                    </div>

                    {/* Alumno Nombre y Apellido Display */}
                    <div>
                        <InputLabel htmlFor="alumno_nombre_apellido" value="Alumno" />
                        <TextInput
                            id="alumno_nombre_apellido"
                            name="alumno_nombre_apellido"
                            value={data.alumno_nombre_apellido}
                            className="mt-1 block w-full"
                            readOnly
                            disabled
                        />
                    </div>

                    {/* Equipo Número de Serie Display */}
                    <div>
                        <InputLabel htmlFor="equipo_num_serie" value="Número de Serie del Equipo" />
                        <TextInput
                            id="equipo_num_serie"
                            name="equipo_num_serie"
                            value={data.equipo_num_serie}
                            className="mt-1 block w-full"
                            readOnly
                            disabled
                        />
                        <InputError message={errors.equipo_id} className="mt-2" /> {/* Error for hidden equipo_id */}
                    </div>

                    {/* Hidden Inputs for actual IDs */}
                    <input type="hidden" name="alumno_id" value={data.alumno_id} />
                    <input type="hidden" name="equipo_id" value={data.equipo_id} />

                    {/* Motivo Textarea */}
                    <div>
                        <InputLabel htmlFor="motivo" value="Motivo" />
                        <textarea
                            id="motivo"
                            name="motivo"
                            value={data.motivo}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('motivo', e.target.value)}
                            required
                        />
                        <InputError message={errors.motivo} className="mt-2" />
                    </div>

                    {/* Estado Select */}
                    <div>
                        <InputLabel htmlFor="estado" value="Estado" />
                        <select
                            id="estado"
                            name="estado"
                            value={data.estado}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('estado', e.target.value)}
                            required
                        >
                            <option value="ticket_generado">Ticket Generado</option>
                            <option value="retirado_por_correo">Retirado por Correo</option>
                            <option value="devuelto_reparado">Devuelto Reparado</option>
                            <option value="devuelto_sin_reparar">Devuelto sin Reparar</option>
                        </select>
                        <InputError message={errors.estado} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing || !data.alumno_id || !data.equipo_id}>Guardar</PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}

ServicioTecnicoCreate.layout = page => <AppLayout children={page} />;

export default ServicioTecnicoCreate;