import React, { useRef, useState, useEffect } from "react";
// SUPABASE: import client Supabase
import { supabase } from "../../../src/services/supabaseClient";
import { Link } from "react-router-dom";
import SideMenu from "../admin/sideMenu";

const User = () => {
  // Ce hook prépare une place pour stocker les données des utilisateurs une fois qu'elles seront récupérées.
  const [users, setUsers] = useState([]);

  // useState pour gérer l'état de chargement lors des appels API (chargement en cours...)
  const [loading, setLoading] = useState(true);

  // Ce hook pour affiche les messages utilisateur.
  const [message, setMessage] = useState("");

  // Ce hook sert de pense-bête pour éviter les appels multiples
  const flag = useRef(false);

  // useEffect permet de charger les données après le rendu initial du composant
  useEffect(() => {
    if (!flag.current) {
      // SUPABASE: récupération des utilisateurs
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .order("id", { ascending: true });
          if (error) throw error;
          setUsers(data);
        } catch (err) {
          console.error(err);
          setMessage("❌ Impossible de charger les utilisateurs.");
          setTimeout(() => setMessage(""), 3000);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
      flag.current = true;
    }
  }, []);

  // Fonction de suppression d'un utilisateur
  const delUser = async (userId, userRole, userFullName) => {
    const isAdmin = userRole === "admin" || userRole === "administrateur";

    const confirmationMessage = isAdmin
      ? `⚠️ Attention : tu t'apprêtes à supprimer un administrateur (${userFullName}). Es-tu sûr(e) ?`
      : `Es-tu sûr(e) de vouloir supprimer ${userFullName} ?`;

    if (!window.confirm(confirmationMessage)) return;

    try {
      // SUPABASE: suppression de l'utilisateur
      const { error } = await supabase.from("users").delete().eq("id", userId);
      if (error) throw error;

      setUsers((current) => current.filter((user) => user.id !== userId));
      setMessage(`✅ Utilisateur ${userFullName} supprimé avec succès.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Impossible de supprimer ${userFullName}.`);
      setTimeout(() => setMessage(""), 3000);
    }
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
        <div className="usersSideMenu w-full flex flex-col gap-4">
          {/* Menu au-dessus du tableau / cards */}
          <div>
            <SideMenu />
          </div>

          {/* Desktop: tableau, Mobile/Tablette: cards */}
          <div className="usersBoard w-full">
            {/* Version Desktop */}
            <div className="hidden lg:block">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-red-500">
                    <th className="p-2 text-center border border-gray-300">
                      🚮
                    </th>
                    <th className="p-2 text-center border border-gray-300">
                      #
                    </th>
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

            {/* Version Mobile/Tablette: cards */}
            <div className="flex flex-col gap-4 lg:hidden">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="border rounded-2xl p-4 bg-white shadow hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">
                      {/* Nom + Prénom cliquables */}
                      <Link to={`/admin/users/useredit/${user.id}`}>
                        {user.firstname} {user.lastname}
                      </Link>
                    </h2>
                    <button
                      className="cursor-pointer hover:bg-red-100 p-1 rounded"
                      onClick={() =>
                        delUser(
                          user.id,
                          user.role,
                          `${user.firstname} ${user.lastname}`
                        )
                      }
                      aria-label={`Supprimer l'utilisateur ${user.firstname} ${user.lastname}`}
                    >
                      🗑️
                    </button>
                  </div>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <Link to={`/admin/users/useredit/${user.id}`}>
                      {user.email}
                    </Link>
                  </p>
                  <p>
                    <span className="font-semibold">Téléphone:</span>{" "}
                    <Link to={`/admin/users/useredit/${user.id}`}>
                      {user.phone}
                    </Link>
                  </p>
                  <p>
                    <span className="font-semibold">Adresse:</span>{" "}
                    <Link to={`/admin/users/useredit/${user.id}`}>
                      {user.address}, {user.city}, {user.postalcode}
                    </Link>
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span>{" "}
                    <Link to={`/admin/users/useredit/${user.id}`}>
                      {user.role}
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
