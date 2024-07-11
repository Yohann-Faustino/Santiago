import React from 'react';
import { useNavigate } from 'react-router-dom';

// Fonction qui retire le token et déconnecte l'utilisateur:
const LogoutButton = () => {

  // Initialise la redirection:
  const navigate = useNavigate();

  // Fonction de déconnection:
  const handleLogout = () => {
    // Supprimez le token JWT:
    localStorage.removeItem('token');
    // On redirige l'utilisateur vers l'accueil une fois la déconnexion réussie:
    navigate('/')
    console.log('Déconnexion réussie');
  };

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
};

export default LogoutButton;
