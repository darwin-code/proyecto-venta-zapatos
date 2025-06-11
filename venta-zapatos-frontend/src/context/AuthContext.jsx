import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Configura Axios para que siempre envíe el token si existe
    axios.defaults.baseURL = 'http://localhost:8000/api'; // La URL base de tu API Laravel
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Cargar usuario al iniciar la app o si el token cambia
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const response = await axios.get('/user'); // Ruta de Laravel para obtener el usuario autenticado
                    setUser(response.data);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } catch (error) {
                    console.error('Failed to load user:', error);
                    // Si el token es inválido o expiró, forzar logout
                    logout();
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        loadUser();
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/login', { email, password });
            const newToken = response.data.token;
            setToken(newToken);
            localStorage.setItem('authToken', newToken); // Guardar en localStorage
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            const userResponse = await axios.get('/user'); // Obtener los datos del usuario
            setUser(userResponse.data);
            navigate('/'); // Redirigir a la página principal
            return true;
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            throw error; // Propagar el error para mostrarlo en el formulario
        }
    };

    const register = async (name, email, password, password_confirmation) => {
        try {
            const response = await axios.post('/register', { name, email, password, password_confirmation });
            // Después del registro, puedes optar por loguear automáticamente o redirigir al login
            // Para este ejemplo, intentaremos loguear al usuario recién registrado
            await login(email, password); // Loguea al usuario después de registrarse
            return true;
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message);
            throw error;
        }
    };

    const logout = async () => {
        if (token) { // Solo intenta logout si hay un token
            try {
                await axios.post('/logout');
            } catch (error) {
                console.error('Logout failed on server:', error);
            }
        }
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken'); // Eliminar de localStorage
        delete axios.defaults.headers.common['Authorization']; // Eliminar el header de Axios
        navigate('/login'); // Redirigir al login
    };

    const isAuthenticated = !!user;

    const value = {
        user,
        token,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
