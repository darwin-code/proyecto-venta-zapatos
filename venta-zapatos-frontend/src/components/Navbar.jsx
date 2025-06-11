// En tu componente de Navbar
import React from 'react'; // Asegúrate de que React esté importado
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// ... otros imports

const Navbar = () => {
    const { user, logout } = useAuth(); // Asumiendo que tienes un contexto de autenticación

    return (
        <nav className="bg-gradient-to-r from-green-600 to-indigo-600 p-4 shadow-xl flex justify-between items-center">
            <Link to="/" className="text-white text-2xl font-extrabold tracking-wide">
                👟 ZapatoExpress
            </Link>
            <div className="flex items-center space-x-6">
                <Link to="/" className="text-white hover:text-gray-200 transition-colors duration-300">
                    Inicio
                </Link>
                {user ? (
                    <>
                        <Link to="/create-product" className="text-white hover:text-gray-200 transition-colors duration-300">
                            Publicar
                        </Link>
                        {/* Nuevo enlace a Mis Productos */}
                        <Link to="/my-products" className="text-white hover:text-gray-200 transition-colors duration-300">
                            Mis Productos
                        </Link>
                        <span className="text-white font-medium">Hola, {user.name}</span>
                        <button
                            onClick={logout} // Asumiendo una función de logout en tu contexto de autenticación
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 shadow-md"
                        >
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-white hover:text-gray-200 transition-colors duration-300">
                            Iniciar Sesión
                        </Link>
                        <Link to="/register" className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-md">
                            Registrarse
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;