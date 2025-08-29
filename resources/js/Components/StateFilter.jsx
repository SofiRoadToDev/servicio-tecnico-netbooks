export default function StateFilter({ selectedState = '', onStateChange }) {
    const states = [
        { value: '', label: 'Todos' },
        { value: 'ticket_generado', label: 'Ticket Generado' },
        { value: 'retirado_por_correo', label: 'Retirado por Correo' },
        { value: 'devuelto_reparado', label: 'Devuelto Reparado' },
        { value: 'devuelto_sin_reparar', label: 'Devuelto Sin Reparar' }
    ];

    return (
        <div className="flex flex-wrap gap-4">
            {states.map((state) => (
                <label key={state.value} className="flex items-center">
                    <input
                        type="radio"
                        name="estado"
                        value={state.value}
                        checked={selectedState === state.value}
                        onChange={(e) => onStateChange(e.target.value)}
                        className="form-radio h-4 w-4 text-gray-800 focus:ring-gray-800 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{state.label}</span>
                </label>
            ))}
        </div>
    );
}