import AppLayout from '../../Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';

function EquipoIndex({ equipos }) {
    const handlePageChange = (page) => {
        router.get(route('equipos.index'), { page }, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <>
            <Head title="Equipos" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de Equipos</h1>
                    <Link href={route('equipos.create')} className="px-4 py-2 bg-gray-800 text-white rounded-md">
                        Crear Equipo
                    </Link>
                </div>
                <div className="mt-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Número de Serie
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Marca
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Modelo
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Características
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {equipos.data.length > 0 ? (
                                equipos.data.map((equipo) => (
                                    <tr key={equipo.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {equipo.num_serie}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {equipo.marca}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {equipo.modelo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {equipo.caracteristicas}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron registros
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                    {/* Paginación */}
                    {equipos.last_page > 1 && (
                        <div className="px-6 py-4 bg-white border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    Mostrando {equipos.from} a {equipos.to} de {equipos.total} registros
                                </div>
                                <div className="flex space-x-2">
                                    {equipos.links.map((link, i) => (
                                        <button
                                            key={i}
                                            onClick={() => link.url && handlePageChange(link.url.split('?page=')[1])}
                                            disabled={!link.url}
                                            className={`px-4 py-2 border rounded ${
                                                link.active 
                                                    ? 'bg-gray-800 text-white' 
                                                    : link.url 
                                                        ? 'bg-white text-gray-800 hover:bg-gray-100' 
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

EquipoIndex.layout = page => <AppLayout children={page} />;

export default EquipoIndex;
