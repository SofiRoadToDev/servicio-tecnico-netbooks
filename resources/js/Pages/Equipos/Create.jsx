import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

function EquipoCreate() {
    const { data, setData, post, processing, errors } = useForm({
        num_serie: '',
        marca: '',
        modelo: '',
        caracteristicas: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('equipos.store'));
    };

    return (
        <>
            <Head title="Crear Equipo" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg font-medium text-gray-900">Crear Nuevo Equipo</h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="num_serie" value="Número de Serie" />
                        <TextInput
                            id="num_serie"
                            name="num_serie"
                            value={data.num_serie}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('num_serie', e.target.value)}
                            required
                            isFocused
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
