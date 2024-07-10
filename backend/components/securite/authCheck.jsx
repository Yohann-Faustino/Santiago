// import React, { useEffect, useState } from 'react';

// // Fontion qui contrôle si l'utilisateur est connecté en vérifiant la présence d'un token:
// const AuthCheck = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       console.log('Utilisateur connecté avec le token:', token);
//       setIsLoggedIn(true);
//     } else {
//       console.log('Utilisateur non connecté');
//       setIsLoggedIn(false);
//     }
//   }, []);

//   return (
//     <div>
//       {isLoggedIn ? (
//         <p>Vous êtes connecté.</p>
//       ) : (
//         <p>Vous n'êtes pas connecté.</p>
//       )}
//     </div>
//   );
// };

// export default AuthCheck;

