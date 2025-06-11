// src/pages/CreateProductPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Tu contexto de autenticación

const CreateProductPage = () => {
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: '',
        size: '',
        image: null,
        status: 'available',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token } = useAuth(); // Obtener el token del contexto de autenticación

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        setProductData({ ...productData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const formData = new FormData();
        formData.append('title', productData.title);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('size', productData.size);
        formData.append('status', productData.status);
        if (productData.image) {
            formData.append('image', productData.image);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/products', formData, { // ATENCIÓN: PUERTO DE LARAVEL ES 8000
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Producto publicado con éxito!');
            setProductData({
                title: '',
                description: '',
                price: '',
                size: '',
                image: null,
                status: 'available',
            });
            e.target.reset();
            navigate('/');
        } catch (err) {
            console.error('Error al publicar el producto:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || err.response?.data?.errors?.title?.[0] || 'Error al publicar el producto. Asegúrate de todos los campos.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
            <h2 className="text-4xl font-extrabold text-green-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                👟 Publicar Nuevo Zapato 👟
            </h2>
            {message && (
                <div className="p-3 mb-4 rounded-md bg-green-100 text-green-700 text-center">
                    {message}
                </div>
            )}
            {error && (
                <div className="p-3 mb-4 rounded-md bg-red-100 text-red-700 text-center">
                    {error}
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
                        value={productData.title}
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
                        value={productData.description}
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
                        value={productData.price}
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
                        value={productData.size}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
                        Imagen del Producto:
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        accept="image/*"
                        required // La imagen es requerida para la creación
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">
                        Disponibilidad:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={productData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="available">Disponible</option>
                        <option value="sold">Agotado</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                    Publicar Zapato
                </button>
            </form>
        </div>
    );
};

export default CreateProductPage;