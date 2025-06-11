// src/components/MyProducts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Tu contexto de autenticación

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, token } = useAuth(); // Obtén el usuario y el token del contexto

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyProducts = async () => {
            if (!user || !token) {
                setError('No estás autenticado.');
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get('http://localhost:8000/api/my-products', { // COMPRUEBA PUERTO DE LARAVEL ES 8000 POR DEFECTO Y RUTA DE LA API.
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluye el token JWT
                    },
                });
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar tus productos.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchMyProducts();
    }, [user, token]);

    const handleDelete = async (productId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            return;
        }
        try {
            await axios.delete(`http://localhost:8000/api/products/${productId}`, { // COMPRUEBA PUERTO DE LARAVEL ES 8000
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(products.filter(product => product.id !== productId)); // Laravel usa 'id' por defecto
            alert('Producto eliminado con éxito.');
        } catch (err) {
            console.error('Error al eliminar el producto:', err);
            alert('Error al eliminar el producto. Inténtalo de nuevo.');
        }
    };

    if (loading) {
        return <div className="text-center p-8">Cargando tus productos...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-600">{error}</div>;
    }

    if (products.length === 0) {
        return <div className="text-center p-8 text-gray-700">Aún no has publicado ningún producto. <Link to="/create-product" className="text-indigo-600 hover:underline">¡Publica uno ahora!</Link></div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                ✨ Tus Productos Publicados ✨
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    // Laravel usa 'id' como clave primaria, no '_id'
                    <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col justify-between">
                        {/* Link al detalle del producto */}
                        <Link to={`/products/${product.id}`} className="block">
                            <img
                                src={`http://localhost:8000${product.image}`} // ATENCIÓN: Ajusta el puerto de Laravel
                                alt={product.title} // Usamos 'title' aquí
                                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </Link>
                        <div className="p-4 flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3> {/* Usamos 'title' aquí */}
                            <p className="text-gray-700 text-lg font-semibold mb-2">${product.price.toFixed(2)}</p>
                            <p className={`text-sm mb-4 ${product.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                                Estado: {product.status === 'available' ? 'Disponible' : 'Agotado'}
                            </p>
                            <div className="mt-auto flex justify-around space-x-2">
                                <Link
                                    to={`/edit-product/${product.id}`} // Laravel usa 'id'
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-center flex-grow"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.id)} // Laravel usa 'id'
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-center flex-grow"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProducts;