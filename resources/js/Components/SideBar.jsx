import { FaUserGraduate, FaLaptop, FaTools } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

const SideBar = () => {
    const menuItems = [
        { name: 'Alumno', icon: <FaUserGraduate />, path: '/alumnos' },
        { name: 'Equipos', icon: <FaLaptop />, path: '/equipos' },
        { name: 'Servicio Tecnico', icon: <FaTools />, path: '/serviciotecnico' }
    ];

    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col">
            <div className="text-2xl font-bold text-center py-6">
                Admin
            </div>
            <nav className="flex-grow">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                            <Link href={item.path} className="flex items-center">
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default SideBar;
