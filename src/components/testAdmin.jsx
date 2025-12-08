// Test pour savoir si la personne connectée est un admin ou non (on garde en com si pas necessaire) et on oublie pas son import et son utilisataion dans App
// import React, { useContext } from "react";
// import { UserContext } from "../contexts/UserContext.jsx";

// const TestAdmin = () => {
//   const { user, loading } = useContext(UserContext);

//   if (loading) return <p>Chargement user...</p>;

//   return (
//     <div style={{ padding: "1rem", border: "1px solid red" }}>
//       <h3>Test User Role</h3>
//       <p>Email : {user?.email || "aucun utilisateur"}</p>
//       <p>Rôle : {user?.role || "aucun rôle"}</p>
//       {user?.role === "admin" ? (
//         <p style={{ color: "green" }}>✅ Utilisateur admin détecté</p>
//       ) : (
//         <p style={{ color: "orange" }}>❌ Pas admin</p>
//       )}
//     </div>
//   );
// };

// export default TestAdmin;
