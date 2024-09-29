// Route.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import ProductDetails from '../components/ProductDetails'; // Import ProductDetails component
import Cart from '../components/Cart'; // Import Cart component
import Buy from '../components/Buy'; // Import Buy component

const RouteConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> {/* Route for Cart */}
        <Route path="/buy" element={<Buy />} />   {/* Route for Buy */}
      </Routes>
    </Router>
  );
};

export default RouteConfig;
