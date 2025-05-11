import React from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from "../services/account.service";

// Fonction qui retire le token et déconnecte l'utilisateur:
const LogoutButton = () => {

  // Initialise la redirection:
  const navigate = useNavigate();

  // Fonction de déconnection:
  const handleLogout = () => {
    
    // Supprimez le token JWT:
    accountService.logout();
    // Redirige après l'affichage du message de déconnexion après le délai défini:
    setTimeout(() => {
      navigate('/');
      window.location.reload(); // Rafraîchir la page pour mettre à jour l'état de connexion dans la nav.
    }, 3000); // 3000 ms = 3 secondes
    // Affiche un message pour voir si la déconnexion a bien réussie:
    console.log('Déconnexion réussie');
  };

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
};

export default LogoutButton;
