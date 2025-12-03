import React, { useRef, useState, useEffect } from "react";
import { userService } from "../../../src/services/user.service";
import { Link } from "react-router-dom";
import SideMenu from "../admin/sideMenu";

const User = () => {
  // Récupère tous les utilisateurs pour les afficher :
  const [users, setUsers] = useState([]);

  // useState pour gérer l'état de chargement lors des appels API (chargement en cours...)
  const [loading, setLoading] = useState(true);

  // Ce hook gère les messages utilisateur
  const [message, setMessage] = useState("");

  // Ce hook sert de pense-bête pour éviter que useEffect se déclenche 2 fois en mode strict
  const flag = useRef(false);

  // useEffect permet de charger les données après le rendu initial du composant
  useEffect(() => {
    // Empêche un double appel inutile :
    if (flag.current === false) {
      userService
        .getAllUsers()
        .then((data) => {
          // ⚠️ data = tableau direct car le service renvoie un tableau !
          setUsers(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setMessage("❌ Erreur lors du chargement des utilisateurs.");
          setTimeout(() => setMessage(""), 3000);
          setLoading(false);
        });
    }

    return () => (flag.current = true);
  }, []);

  // Fonction de suppression d'un utilisateur
  const delUser = (userId, userRole, userFullName) => {
    const isAdmin = userRole === "admin" || userRole === "administrateur";

    const confirmationMessage = isAdmin
      ? `⚠️ Attention : tu t'apprêtes à supprimer un administrateur (${userFullName}). Es-tu sûr(e) ?`
      : `Es-tu sûr(e) de vouloir supprimer ${userFullName} ?`;

    if (!window.confirm(confirmationMessage)) return;

    userService
      .deleteUser(userId)
      .then(() => {
        // On retire l'utilisateur supprimé du tableau
        setUsers((current) => current.filter((user) => user.id !== userId));
        setMessage(`✅ Utilisateur ${userFullName} supprimé avec succès.`);
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        console.error(err);
        setMessage(`❌ Impossible de supprimer ${userFullName}.`);
        setTimeout(() => setMessage(""), 3000);
      });
  };

  return (
    <div className="users p-4">
      <h1 className="mb-4">Liste des utilisateurs :</h1>

      {/* Affichage d’un message de succès ou d’erreur */}
      {message && (
        <div aria-live="polite" className="mt-2 font-semibold mb-4 text-center">
          {message}
        </div>
      )}

      {loading ? (
        <p>Chargement des utilisateurs...</p>
      ) : (
        <div className="usersSideMenu w-full">
          <div>
            <SideMenu />
          </div>

          <div className="usersBoard">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-red-500">
                  <th className="p-2 text-center border border-gray-300">🚮</th>
                  <th className="p-2 text-center border border-gray-300">#</th>
                  <th className="p-2 text-center border border-gray-300">
                    Prénom
                  </th>
                  <th className="p-2 text-center border border-gray-300">
                    Nom
                  </th>
                  <th className="p-2 text-center border border-gray-300">
                    Email
                  </th>
                  <th className="p-2 text-center border border-gray-300">
                    Téléphone
                  </th>
                  <th className="p-2 text-center border border-gray-300">
                    Adresse
                  </th>
                  <th className="p-2 text-center border border-gray-300">
                    Ville
                  </th>
                  <th className="p-2 text-center border border-gray-300">
                    Code Postal
                  </th>
                  <th className="p-2 text-center border border-gray-300">
                    Type
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    {/* Bouton delete */}
                    <td className="p-2 text-center border border-gray-300">
                      <button
                        className="cursor-pointer hover:bg-red-100"
                        onClick={() =>
                          delUser(
                            user.id,
                            user.role,
                            `${user.firstname} ${user.lastname}`
                          )
                        }
                        aria-label={`Supprimer l'utilisateur ${user.firstname} ${user.lastname}`}
                        title="Supprimer l'utilisateur"
                      >
                        🗑️
                      </button>
                    </td>

                    {/* Chaque cellule pointe vers l’édition */}
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/users/useredit/${user.id}`}>
                        {user.id}
                      </Link>
                    </td>
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/users/useredit/${user.id}`}>
                        {user.firstname}
                      </Link>
                    </td>
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/users/useredit/${user.id}`}>
                        {user.lastname}
                      </Link>
                    </td>
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/users/useredit/${user.id}`}>
                        {user.email}
                      </Link>
                    </td>
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/users/useredit/${user.id}`}>
                        {user.phone}
                      </Link>
                    </td>
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/users/useredit/${user.id}`}>
                        {user.address}
                      </Link>
                    </td>
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/users/useredit/${user.id}`}>
                        {user.city}
                      </Link>
                    </td>
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/users/useredit/${user.id}`}>
                        {user.postalcode}
                      </Link>
                    </td>
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/users/useredit/${user.id}`}>
                        {user.role}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
