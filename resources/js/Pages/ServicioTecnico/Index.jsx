import AppLayout from '../../Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import SearchBox from '@/Components/SearchBox';
import StateFilter from '@/Components/StateFilter';
import { FaEdit, FaTrash } from 'react-icons/fa';

function ServicioTecnicoIndex({ serviciosTecnicos = { data: [] }, filters = {} }) {
    const handleSearch = (dni) => {
        router.get(route('serviciotecnico.index'), { 
            dni, 
            estado: filters.estado 
        }, {
            preserveState: true,
            replace: true
        });
    };
    
    const handleDelete = (id) => {
        if (confirm('¿Está seguro que desea eliminar este servicio técnico?')) {
            router.delete(route('serviciotecnico.destroy', id));
        }
    };

    const handleStateChange = (estado) => {
        router.get(route('serviciotecnico.index'), { 
            dni: filters.dni,
            estado 
        }, {
            preserveState: true,
            replace: true
        });
    };
    
    const handlePageChange = (page) => {
        router.get(route('serviciotecnico.index'), { 
            page: page,
            dni: filters.dni,
            estado: filters.estado 
        }, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <>
            <Head title="Servicios Técnicos" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                 <h1 className="text-2xl font-bold">Lista de Servicios Técnicos</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between items-center">               
                        <Link href={route('serviciotecnico.create')} className="px-4 py-2 bg-gray-800 text-white rounded-md">
                            Crear Servicio
                        </Link>
                    </div>
                
                {/* Componentes de filtrado */}
                    <div className="mt-4 space-y-4">
                        <SearchBox 
                            onSearch={handleSearch} 
                            placeholder="Ingrese DNI del alumno" 
                            label="Filtrar por DNI"
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Estado:</label>
                            <StateFilter 
                                selectedState={filters.estado}
                                onStateChange={handleStateChange}
                            />
                        </div>
                    </div>
                </div>
                
                
                <div className="mt-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Número de Ticket
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {serviciosTecnicos.data.length > 0 ? (
                                serviciosTecnicos.data.map((servicio) => (
                                    <tr key={servicio.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(servicio.fecha).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {servicio.numero_ticket || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {servicio.alumno ? `${servicio.alumno.apellido}, ${servicio.alumno.nombre} (DNI: ${servicio.alumno.dni})` : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {servicio.equipo ? `${servicio.equipo.marca} ${servicio.equipo.modelo}` : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {servicio.estado}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link href={route('serviciotecnico.edit', servicio.id)} className="text-indigo-600 hover:text-indigo-900">
                                                    <FaEdit className="h-5 w-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(servicio.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <FaTrash className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron registros
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                    {/* Paginación */}
                    {serviciosTecnicos.last_page > 1 && (
                        <div className="px-6 py-4 bg-white border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    Mostrando {serviciosTecnicos.from} a {serviciosTecnicos.to} de {serviciosTecnicos.total} registros
                                </div>
                                <div className="flex space-x-2">
                                    {serviciosTecnicos.links.map((link, i) => (
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

ServicioTecnicoIndex.layout = page => <AppLayout children={page} />;

export default ServicioTecnicoIndex;
