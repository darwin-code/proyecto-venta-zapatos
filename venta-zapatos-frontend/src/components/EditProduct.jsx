// src/components/EditProduct.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Tu contexto de autenticación

const EditProduct = () => {
    const { id } = useParams(); // Obtener el ID del producto de la URL
    const navigate = useNavigate();
    const { token } = useAuth(); // Obtén el token del contexto de autenticación

    const [product, setProduct] = useState({
        title: '', // Cambiado de 'name' a 'title'
        description: '',
        price: '',
        size: '', // Añadido el campo 'size'
        status: 'available', // Cambiado de 'available' a 'status', con valor inicial 'available'
        // image: null // No pre-rellenamos el campo de archivo por seguridad y complejidad
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(''); // Para mensajes de éxito/error

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`); // ATENCIÓN: PUERTO DE LARAVEL ES 8000
                setProduct({
                    title: response.data.title, // Usar 'title'
                    description: response.data.description,
                    price: response.data.price,
                    size: response.data.size, // Asignar 'size'
                    status: response.data.status, // Usar 'status'
                });
                setLoading(false);
            } catch (err) {
                setError('Error al cargar el producto para editar.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target; // No necesitamos 'type' o 'checked' para el enum de status
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value, // Actualiza el valor directamente
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Limpiar mensajes anteriores

        // Asegúrate de que el objeto que envías a Laravel coincida con los campos esperados
        const dataToSend = {
            title: product.title,
            description: product.description,
            price: parseFloat(product.price), // Asegúrate de que el precio sea un número
            size: product.size,
            status: product.status,
            // Si manejas la imagen aquí, necesitarías FormData
        };

        try {
            await axios.put(`http://localhost:8000/api/products/${id}`, dataToSend, { // ATENCIÓN: PUERTO DE LARAVEL ES 8000
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token JWT para autorización
                    'Content-Type': 'application/json', // Importante para enviar JSON
                },
            });
            setMessage('Producto actualizado con éxito!');
            navigate(`/products/${id}`); // Redirigir a la página de detalle del producto
        } catch (err) {
            console.error('Error al actualizar el producto:', err.response ? err.response.data : err.message);
            setMessage('Error al actualizar el producto. Asegúrate de tener los permisos.');
            setError(err.response ? (err.response.data.message || err.response.data.errors) : 'Error desconocido');
        }
    };

    if (loading) {
        return <div className="text-center p-8">Cargando información del producto...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                ✨ Editar Producto ✨
            </h2>
            {message && (
                <div className={`p-3 mb-4 rounded-md text-center ${message.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
                <div>
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                        Nombre del Zapato:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                        Descripción:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
                        Precio:
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        step="0.01"
                        min="0"
                    />
                </div>
                <div>
                    <label htmlFor="size" className="block text-gray-700 font-semibold mb-2">
                        Talla:
                    </label>
                    <input
                        type="text"
                        id="size"
                        name="size"
                        value={product.size}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">
                        Disponibilidad:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={product.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="available">Disponible</option>
                        <option value="sold">Agotado</option>
                    </select>
                </div>
                {/* Si quieres un input de imagen aquí, necesitarías refactorizar para usar FormData */}
                {/* <input type="file" name="image" onChange={handleImageChange} /> */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                    Actualizar Producto
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/my-products')}
                    className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md transform hover:scale-105"
                >
                    Volver a Mis Productos
                </button>
            </form>
        </div>
    );
};

export default EditProduct;