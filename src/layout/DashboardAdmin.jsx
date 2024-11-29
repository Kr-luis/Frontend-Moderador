import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoGamer from '../assets/gamer.png';

const DashboardAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType');
        setIsAdmin(userType === 'administrador');

        if (!token) {
            navigate('/ingresar');
        }
    }, []);

    return (
        <div className="min-h-screen w-full flex justify-between items-start bg-[url('/public/images/Moderador.png')] bg-no-repeat bg-cover bg-center">
            {/* Sidebar */}
            <div className="bg-yellow-200 bg-opacity-90 p-6 rounded-lg shadow-lg w-11/12 max-w-md min-h-screen flex flex-col justify-start space-y-4">
                <h2 className='text-4xl font-black text-center text-gray-800'>QuitoTech</h2>
                <hr className="border-yellow-400" />
                <ul className="mt-5 flex flex-col space-y-4">
                    <li className="text-center">
                        <div className="text-gray-800 bg-yellow-600 px-3 py-2 rounded-md text-xl hover:bg-yellow-700">
                            <Link to="/dashboardadmin/crearmoderador">Crear Moderadores</Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="text-gray-800 bg-yellow-600 px-3 py-2 rounded-md text-xl hover:bg-yellow-700">
                            <Link to="/dashboardadmin/listartiendaadmin">Tiendas</Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="text-gray-800 bg-yellow-600 px-3 py-2 rounded-md text-xl hover:bg-yellow-700">
                            <Link to={isAdmin ? "/dashboard/administrartienda" : "/dashboard/confirmacion"}>
                                {isAdmin ? "Administrar tienda" : "Registrar tienda"}
                            </Link>
                        </div>
                    </li>
                    {isAdmin && (
                        <>
                            <li className="text-center">
                                <div className="text-gray-800 bg-yellow-600 px-3 py-2 rounded-md text-xl hover:bg-yellow-700">
                                    <Link to="/dashboard/gestionarusuarios">Gestionar Usuarios</Link>
                                </div>
                            </li>
                            <li className="text-center">
                                <div className="text-gray-800 bg-yellow-600 px-3 py-2 rounded-md text-xl hover:bg-yellow-700">
                                    <Link to="/dashboard/reportes">Reportes</Link>
                                </div>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex justify-center items-center">
                <div className="bg-yellow-200 bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col items-center gap-4 border border-yellow-300">
                    <hr className='my-2 w-full border-yellow-400' />
                    <h2 className='text-3xl font-extrabold text-center text-gray-800 mb-1'>Conoce Más Sobre Nosotros</h2>
                    <hr className='my-2 w-full border-yellow-400' />
                    <p className='text-gray-700 text-base mb-1'>
                        ¡Bienvenido a nuestra plataforma, el lugar ideal para los apasionados del gaming! Aquí podrás conectar con las mejores tiendas...
                    </p>
                    <p className='text-gray-700 text-base'>
                        Explora, descubre y encuentra las mejores tiendas para mejorar tu experiencia de juego. <b>¡Sé bienvenido a nuestro sistema!</b>
                    </p>
                    <div className='relative mx-auto w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mt-4'>
                        <img src={logoGamer} alt="logo-gamer" className="object-contain w-full h-full" />
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="absolute bottom-4 left-4">
                <Link to="/" onClick={() => localStorage.clear()}>
                    <img src="/public/images/salida.png" alt="Volver" className="w-16 h-16" />
                </Link>
            </div>
        </div>
    );
};

export default DashboardAdmin;
