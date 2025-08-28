import AppLayout from '../../Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

function AlumnoIndex({ alumnos }) {
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
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {alumnos.map((alumno) => (
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

AlumnoIndex.layout = page => <AppLayout children={page} />;

export default AlumnoIndex;
