// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const { id } = useParams(); // Obtener el ID del producto de la URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`); // ATENCIÓN: PUERTO DE LARAVEL ES 8000
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar el producto.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-center p-8">Cargando detalles del producto...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-600">{error}</div>;
    }

    if (!product) {
        return <div className="text-center p-8 text-gray-700">Producto no encontrado.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex md:max-w-4xl mx-auto">
                <div className="md:flex-shrink-0">
                    {/* Ajusta la URL de la imagen */}
                    <img
                        src={`http://localhost:8000${product.image}`} // ATENCIÓN: PUERTO DE LARAVEL ES 8000
                        alt={product.title} // Usamos 'title' aquí
                        className="h-96 w-full object-cover md:w-96"
                    />
                </div>
                <div className="p-8 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{product.title}</h1> {/* Usamos 'title' aquí */}
                        <p className="text-gray-700 text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
                        <p className="text-gray-600 mb-6">{product.description}</p>
                        <p className="text-gray-500 text-md mb-2">Talla: {product.size}</p> {/* Mostrar la talla */}
                        {/* Usamos 'status' aquí y lo mapeamos a texto */}
                        <p className={`text-md font-bold ${product.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                            Estado: {product.status === 'available' ? 'Disponible' : 'Agotado'}
                        </p>
                        <p className="text-gray-500 text-sm mt-2">Publicado por: {product.user?.name || 'Usuario desconocido'}</p>
                        <p className="text-gray-500 text-sm">Fecha de publicación: {new Date(product.created_at).toLocaleDateString()}</p>
                    </div>
                    <button className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105">
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;