import AppLayout from '../../Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function AlumnoIndex({ alumnos }) {
    const handlePageChange = (page) => {
        router.get(route('alumnos.index'), { page }, {
            preserveState: true,
            replace: true
        });
    };
    
    const handleDelete = (id) => {
        if (confirm('¿Está seguro que desea eliminar este alumno?')) {
            router.delete(route('alumnos.destroy', id));
        }
    };

    return (
        <>
            <Head title="Alumnos" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de Alumnos</h1>
                    <Link href={route('alumnos.create')} className="px-4 py-2 bg-gray-800 text-white rounded-md">
                        Crear Alumno
                    </Link>
                </div>
                <div className="mt-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Apellido
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    DNI
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {alumnos.data.length > 0 ? (
                                alumnos.data.map((alumno) => (
                                    <tr key={alumno.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {alumno.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {alumno.apellido}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {alumno.dni}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link href={route('alumnos.edit', alumno.id)} className="text-indigo-600 hover:text-indigo-900">
                                                    <FaEdit className="h-5 w-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(alumno.id)}
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
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron registros
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                    {/* Paginación */}
                    {alumnos.last_page > 1 && (
                        <div className="px-6 py-4 bg-white border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    Mostrando {alumnos.from} a {alumnos.to} de {alumnos.total} registros
                                </div>
                                <div className="flex space-x-2">
                                    {alumnos.links.map((link, i) => (
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

AlumnoIndex.layout = page => <AppLayout children={page} />;

export default AlumnoIndex;
