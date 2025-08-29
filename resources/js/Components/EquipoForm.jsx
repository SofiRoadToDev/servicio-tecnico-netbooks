import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function EquipoForm({ data, setData, errors }) {
    return (
        <div className="border border-gray-200 rounded-md p-4 mt-4 bg-gray-50">
            <h3 className="text-md font-medium text-gray-700 mb-4">Datos del Equipo</h3>
            
            <div className="space-y-4">
                <div>
                    <InputLabel htmlFor="equipo_num_serie" value="Número de Serie" />
                    <TextInput
                        id="equipo_num_serie"
                        name="equipo_num_serie"
                        value={data.equipo_num_serie || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('equipo_num_serie', e.target.value)}
                        required
                    />
                    <InputError message={errors.equipo_num_serie} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="equipo_marca" value="Marca" />
                    <TextInput
                        id="equipo_marca"
                        name="equipo_marca"
                        value={data.equipo_marca || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('equipo_marca', e.target.value)}
                        required
                    />
                    <InputError message={errors.equipo_marca} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="equipo_modelo" value="Modelo" />
                    <TextInput
                        id="equipo_modelo"
                        name="equipo_modelo"
                        value={data.equipo_modelo || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('equipo_modelo', e.target.value)}
                        required
                    />
                    <InputError message={errors.equipo_modelo} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="equipo_caracteristicas" value="Características" />
                    <textarea
                        id="equipo_caracteristicas"
                        name="equipo_caracteristicas"
                        value={data.equipo_caracteristicas || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => setData('equipo_caracteristicas', e.target.value)}
                        required
                    />
                    <InputError message={errors.equipo_caracteristicas} className="mt-2" />
                </div>
            </div>
        </div>
    );
}