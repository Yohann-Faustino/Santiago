import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";
import { UserContext } from "../contexts/UserContext";

const Nav = () => {
  // Récupère l'utilisateur connecté depuis le contexte
  const { user } = useContext(UserContext);
  const isLoggedIn = !!user; // true si un utilisateur est connecté
  const isAdmin = user?.role === "admin"; // true si l'utilisateur a le rôle admin

  // État pour savoir quel onglet est actif (pour le style)
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index) => setActiveIndex(index);

  return (
    <nav className="mr-4" aria-label="Navigation principale">
      <ul className="flex md:flex-row sm:flex-row lg:flex-col gap-2">
        {/* Onglets visibles par tous */}
        <li className={activeIndex === 0 ? "whiteLink" : "linkNav"}>
          <Link to="/" onClick={() => handleClick(0)}>
            Accueil
          </Link>
        </li>
        <li className={activeIndex === 1 ? "whiteLink" : "linkNav"}>
          <Link to="/contact" onClick={() => handleClick(1)}>
            Contact
          </Link>
        </li>
        <li className={activeIndex === 2 ? "whiteLink" : "linkNav"}>
          <Link to="/comments" onClick={() => handleClick(2)}>
            Commentaires
          </Link>
        </li>
        <li className={activeIndex === 3 ? "whiteLink" : "linkNav"}>
          <Link to="/prestations" onClick={() => handleClick(3)}>
            Prestations
          </Link>
        </li>

        {/* Bouton S'identifier si non connecté */}
        {!isLoggedIn && (
          <li className={activeIndex === 5 ? "whiteLink" : "linkNav"}>
            <Link to="/signup" onClick={() => handleClick(5)}>
              S'identifier
            </Link>
          </li>
        )}

        {/* Boutons Profil / Admin / Déconnexion si connecté */}
        {isLoggedIn && (
          <>
            {/* Profil */}
            <li className={activeIndex === 6 ? "whiteLink" : "linkNav"}>
              <Link to="/profile" onClick={() => handleClick(6)}>
                Profil
              </Link>
            </li>

            {/* Admin (visible seulement si rôle admin) */}
            {isAdmin && (
              <li className={activeIndex === 7 ? "whiteLink" : "linkNav"}>
                <Link to="/admin" onClick={() => handleClick(7)}>
                  Admin
                </Link>
              </li>
            )}

            {/* Déconnexion */}
            <li className={activeIndex === 10 ? "whiteLink" : "linkNav"}>
              <div onClick={() => handleClick(10)} className="cursor-pointer">
                <LogoutButton />
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
