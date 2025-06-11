// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Asegúrate de que la URL apunte a tu backend de Laravel (por defecto en el puerto 8000)
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los productos.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-indigo-600">
        👟 Novedades en ZapatoExpress 👟
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          // Laravel usa 'id' como clave primaria, no '_id'
          <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <Link to={`/products/${product.id}`} className="block">
              {/* Ajusta la URL de la imagen si es necesario. Laravel por defecto sirve `/storage/products/` */}
              {/* Si tu backend retorna /storage/products/imagen.jpg, el path ya es correcto */}
              <img
                src={`http://localhost:8000${product.image}`} // ATENCIÓN: Ajusta el puerto de Laravel
                alt={product.title} // Usamos 'title' aquí
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3> {/* Usamos 'title' aquí */}
              <p className="text-gray-700 text-lg font-semibold mb-2">${product.price.toFixed(2)}</p>
              {/* Usamos 'status' aquí y lo mapeamos a texto */}
              <p className={`text-sm ${product.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                Estado: {product.status === 'available' ? 'Disponible' : 'Agotado'}
              </p>
              <p className="text-gray-500 text-sm mt-1">Talla: {product.size}</p> {/* Mostrar la talla */}
            </div>
            {/* Si tienes un botón "Ver detalles" aquí, asegúrate de que use product.id */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;