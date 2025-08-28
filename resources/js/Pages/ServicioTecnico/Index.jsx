import AppLayout from '../../Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

// The controller will need to pass 'servicios' with 'alumno' and 'equipo' data eager loaded.
function ServicioTecnicoIndex({ servicios = [] }) {
    return (
        <>
            <Head title="Servicios Técnicos" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de Servicios Técnicos</h1>
                    <Link href={route('serviciotecnico.create')} className="px-4 py-2 bg-gray-800 text-white rounded-md">
                        Crear Servicio
                    </Link>
                </div>
                <div className="mt-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Alumno
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Equipo
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {servicios.map((servicio) => (
                                <tr key={servicio.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(servicio.fecha).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {servicio.alumno ? `${servicio.alumno.apellido}, ${servicio.alumno.nombre}` : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {servicio.equipo ? `${servicio.equipo.marca} ${servicio.equipo.modelo}` : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {servicio.estado}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

ServicioTecnicoIndex.layout = page => <AppLayout children={page} />;

export default ServicioTecnicoIndex;
