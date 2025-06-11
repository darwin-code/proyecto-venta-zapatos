import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    // URL de la imagen, con un placeholder si no hay imagen
    const imageUrl = product.image ? `http://localhost:8000${product.image}` : 'https://placehold.co/400x300/E0E0E0/333333?text=Sin+Imagen';

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
            <Link to={`/products/${product.id}`}>
                <img
                    src={imageUrl}
                    alt={product.title}
                    // Asegura que la imagen ocupe el espacio sin distorsionarse y tenga un tamaño fijo
                    className="w-full h-64 object-cover object-center rounded-t-xl"
                    // Fallback para imágenes que no cargan
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/E0E0E0/333333?text=Error+Carga+Imagen'; }}
                />
            </Link>
            <div className="p-6">
                <Link to={`/products/${product.id}`} className="block text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors duration-200 truncate mb-2">
                    {product.title}
                </Link>
                <p className="text-gray-700 text-xl font-extrabold mb-3">${parseFloat(product.price).toFixed(2)}</p>
                <p className={`text-base font-semibold ${product.status === 'sold' ? 'text-red-600' : 'text-green-600'} mb-3`}>
                    Estado: {product.status === 'available' ? 'Disponible' : 'Vendido'}
                </p>
                {product.user && (
                    <p className="text-sm text-gray-500">Publicado por: <span className="font-medium">{product.user.name}</span></p>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
