import React from 'react';

// Fonction qui retire le token et déconnecte l'utilisateur:
const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimez le token JWT.
    window.location.href = '/'; // Redirige vers l'accueil après la déconnexion.
    console.log('Déconnexion réussie');
  };

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
};

export default LogoutButton;
