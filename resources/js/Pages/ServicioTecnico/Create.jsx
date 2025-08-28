import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

// Note: We are receiving alumnos and equipos as props from the controller
function ServicioTecnicoCreate({ alumnos, equipos }) {
    const { data, setData, post, processing, errors } = useForm({
        fecha: '',
        alumno_id: '',
        equipo_id: '',
        motivo: '',
        estado: 'ticket_generado', // Default value
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('serviciotecnicos.store'));
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

                    {/* Alumno Select */}
                    <div>
                        <InputLabel htmlFor="alumno_id" value="Alumno" />
                        <select
                            id="alumno_id"
                            name="alumno_id"
                            value={data.alumno_id}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('alumno_id', e.target.value)}
                            required
                        >
                            <option value="">Seleccione un Alumno</option>
                            {alumnos.map((alumno) => (
                                <option key={alumno.id} value={alumno.id}>
                                    {alumno.apellido}, {alumno.nombre} (DNI: {alumno.dni})
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.alumno_id} className="mt-2" />
                    </div>

                    {/* Equipo Select */}
                    <div>
                        <InputLabel htmlFor="equipo_id" value="Equipo" />
                        <select
                            id="equipo_id"
                            name="equipo_id"
                            value={data.equipo_id}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('equipo_id', e.target.value)}
                            required
                        >
                            <option value="">Seleccione un Equipo</option>
                            {equipos.map((equipo) => (
                                <option key={equipo.id} value={equipo.id}>
                                    {equipo.marca} {equipo.modelo} (S/N: {equipo.num_serie})
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.equipo_id} className="mt-2" />
                    </div>

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
                        <PrimaryButton disabled={processing}>Guardar</PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}

ServicioTecnicoCreate.layout = page => <AppLayout children={page} />;

export default ServicioTecnicoCreate;
