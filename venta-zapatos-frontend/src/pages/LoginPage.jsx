import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Limpiar errores previos
        try {
            await login(email, password);
            // Redirección manejada por AuthContext
        } catch (err) {
            setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4"> {/* Ajusta altura y padding */}
            <div className="bg-white p-10 rounded-2xl shadow-3xl w-full max-w-md border border-gray-100 transform hover:scale-103 transition-transform duration-300">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">👋 Iniciar Sesión</h2>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-xl relative mb-6 text-base font-medium">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base"
                            id="email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base"
                            id="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-7 rounded-full focus:outline-none focus:shadow-outline shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-lg border-2 border-blue-400"
                            type="submit"
                        >
                            Iniciar Sesión
                        </button>
                        <Link to="/register" className="inline-block align-baseline font-semibold text-blue-600 hover:text-blue-800 text-base transition-colors duration-200">
                            ¿No tienes cuenta? Regístrate
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
