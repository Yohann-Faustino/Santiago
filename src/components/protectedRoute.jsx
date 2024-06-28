import React from 'react';
import { Navigate } from 'react-router-dom';

// Fonction qui autorise ou non l'utilisateur a accèder à certaines pages:
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/signup" />;
};

export default ProtectedRoute;
