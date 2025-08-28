import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function SearchBox({ onSearch, placeholder = 'Buscar...', label = 'Buscar' }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <div className="flex-grow">
                    <InputLabel htmlFor="search" value={label} />
                    <TextInput
                        id="search"
                        type="text"
                        value={searchTerm}
                        className="mt-1 block w-full"
                        placeholder={placeholder}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <PrimaryButton type="submit" className="mb-1">
                    Buscar
                </PrimaryButton>
            </form>
        </div>
    );
}