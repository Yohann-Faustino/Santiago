// import React, { useEffect, useState } from 'react';

// const ProtectedData = ({ route }) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchProtectedResource = async () => {
//     const token = localStorage.getItem('token');
//     console.log('Authorization Header:', `Bearer ${token}`);
//     try {
//       const response = await fetch(`http://localhost:3000/${route}`, { // Réfère aux routes sécurisées définies dans le App.jsx.
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setData(data);
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError('Erreur lors de la récupération des données protégées');
//       console.error('Erreur:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProtectedResource();
//   }, [route]); // Ajout de route dans les dépendances du useEffect pour que cela se mette à jour dynamiquement lorsque route change de route.

//   if (error) {
//     return <div>Erreur: {error}</div>;
//   }

//   if (!data) {
//     return <div>Chargement des données protégées...</div>;
//   }

//   return (
//     <div>
//       <h1>Données protégées</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default ProtectedData;
