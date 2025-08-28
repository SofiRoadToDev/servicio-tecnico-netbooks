import AppLayout from '../Layouts/AppLayout';
import { Head } from '@inertiajs/react';

function Home() {
    return (
        <>
            <Head title="Home" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">¡Bienvenido a la página de inicio! Este contenido es específico de Home.jsx.</div>
                </div>
            </div>
        </>
    );
}

Home.layout = page => <AppLayout children={page} />;

export default Home;
