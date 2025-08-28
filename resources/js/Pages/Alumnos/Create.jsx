import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

function AlumnoCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        apellido: '',
        dni: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('alumnos.store'));
    };

    return (
        <>
            <Head title="Crear Alumno" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg font-medium text-gray-900">Crear Nuevo Alumno</h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="nombre" value="Nombre" />
                        <TextInput
                            id="nombre"
                            name="nombre"
                            value={data.nombre}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('nombre', e.target.value)}
                            required
                            isFocused
                        />
                        <InputError message={errors.nombre} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="apellido" value="Apellido" />
                        <TextInput
                            id="apellido"
                            name="apellido"
                            value={data.apellido}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('apellido', e.target.value)}
                            required
                        />
                        <InputError message={errors.apellido} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="dni" value="DNI" />
                        <TextInput
                            id="dni"
                            name="dni"
                            value={data.dni}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('dni', e.target.value)}
                            required
                        />
                        <InputError message={errors.dni} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Guardar</PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}

AlumnoCreate.layout = page => <AppLayout children={page} />;

export default AlumnoCreate;
