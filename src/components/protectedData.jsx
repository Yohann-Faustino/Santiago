import React, { useEffect, useState } from 'react';

// Fonction qui vérifie l'authenticité et le rôle de l'utilisateur qui a un token avant de lui permettre d'accéder aux données sensibles ou non.
const ProtectedData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchProtectedResource = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/protected', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setData(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Erreur lors de la récupération des données protégées');
      console.error('Erreur:', error);
    }
  };

  useEffect(() => {
    fetchProtectedResource();
  }, []);

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!data) {
    return <div>Chargement des données protégées...</div>;
  }

  return (
    <div>
      <h1>Données protégées</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProtectedData;
