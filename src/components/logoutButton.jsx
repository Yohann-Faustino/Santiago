import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from "../services/account.service";

// Fonction qui retire le token et déconnecte l'utilisateur:
const LogoutButton = () => {

  // Initialise la redirection:
  const navigate = useNavigate();

  // État pour afficher un message temporaire de déconnexion
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Effet pour gérer le délai avant redirection + nettoyage en cas de démontage du composant
  useEffect(() => {
    let timer;
    if (isLoggingOut) {
      timer = setTimeout(() => {
        navigate('/');
        window.location.reload(); // Rafraîchir la page pour mettre à jour l'état de connexion dans la nav.
      }, 3000); // 3000 ms = 3 secondes
    }
    return () => clearTimeout(timer); // Nettoie le timeout si le composant est démonté avant la fin
  }, [isLoggingOut, navigate]);

  // Fonction de déconnection:
  const handleLogout = () => {
    
    // Supprimez le token JWT:
    accountService.logout();
    setIsLoggingOut(true); // Déclenche l'affichage du message temporaire
    // Affiche un message pour voir si la déconnexion a bien réussie:
    console.log('Déconnexion réussie');
  };

  return (
    // Bouton de déconnexion avec message Déconnexion en cours... pour l'utilisateur
    <button 
      onClick={handleLogout} 
      aria-label="Bouton de déconnexion"
      disabled={isLoggingOut} // Empêche les clics multiples pendant le délai
    >
      {isLoggingOut ? 'Déconnexion en cours...' : 'Déconnexion'}
    </button>
  );
};

export default LogoutButton;
