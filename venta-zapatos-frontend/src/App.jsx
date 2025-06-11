import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CreateProductPage from './pages/CreateProductPage.jsx';
import Navbar from './components/Navbar.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// Importa los nuevos componentes para Mis Productos y Editar Producto
import MyProducts from './components/MyProducts.jsx'; // Asegúrate de crear este archivo
import EditProduct from './components/EditProduct.jsx'; // Asegúrate de crear este archivo

function App() {
  return (
    <Router>
      <AuthProvider> {/* Envuelve toda la aplicación con el proveedor de autenticación */}
        <Navbar /> {/* Un componente de navegación que se muestra en todas las páginas */}
        {/* Contenedor principal con margen automático, padding generoso y altura mínima para el fondo */}
        <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-80px)]"> {/* Ajusta altura para Navbar */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} /> {/* Ruta para el detalle del producto */}

            {/* Rutas protegidas que solo pueden ser accedidas si el usuario está autenticado */}
            <Route element={<PrivateRoute />}>
              <Route path="/create-product" element={<CreateProductPage />} />
              {/* ¡Nuevas rutas protegidas para Mis Productos y Editar Producto! */}
              <Route path="/my-products" element={<MyProducts />} />
              <Route path="/edit-product/:id" element={<EditProduct />} /> {/* Para editar un producto específico */}
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;