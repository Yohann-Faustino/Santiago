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
    // Redirige après l'affichage du message de déconnexion aprês le délai qu'on va définir:
    setTimeout(() => {
      navigate('/');
    }, 3000); // 3000 ms = 3 secondes
    // Affiche un message pour voir si la déconnexion a bien réussie:
    console.log('Déconnexion réussie');
  };

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
};

export default LogoutButton;
