import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(name, email, password, passwordConfirmation);
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el registro. Inténtalo de nuevo.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4"> {/* Ajusta altura y padding */}
      <div className="bg-white p-10 rounded-2xl shadow-3xl w-full max-w-md border border-gray-100 transform hover:scale-103 transition-transform duration-300">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">✨ Registrarse</h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-lg relative mb-6 text-base font-medium">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="name">
              Nombre
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-transparent transition-all duration-200 text-base"
              id="name"
              type="text"
              placeholder="Tu Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-transparent transition-all duration-200 text-base"
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-transparent transition-all duration-200 text-base"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="password_confirmation">
              Confirmar Contraseña
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-transparent transition-all duration-200 text-base"
              id="password_confirmation"
              type="password"
              placeholder="********"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 px-7 rounded-full focus:outline-none focus:shadow-outline shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-lg border-2 border-green-400"
              type="submit"
            >
              Registrarse
            </button>
            <Link to="/login" className="inline-block align-baseline font-semibold text-green-600 hover:text-green-800 text-base transition-colors duration-200">
              ¿Ya tienes cuenta? Inicia Sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
