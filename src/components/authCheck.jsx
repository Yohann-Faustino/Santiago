import React, { useEffect, useState } from 'react';

const AuthCheck = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Utilisateur connecté avec le token:', token);
      setIsLoggedIn(true);
      // Vous pouvez également ajouter du code ici pour faire une requête au serveur
      // et vérifier si le token est toujours valide.
    } else {
      console.log('Utilisateur non connecté');
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <p>Vous êtes connecté.</p>
      ) : (
        <p>Vous n'êtes pas connecté.</p>
      )}
    </div>
  );
};

export default AuthCheck;
