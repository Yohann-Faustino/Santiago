import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { accountService } from "../services/account.service";
import LogoutButton from "./logoutButton";

const Nav = () => {
  // Gère l'état des éléments de navigation pour déterminer lequel est actif:
  const [activeIndex, setActiveIndex] = useState(null);

  // Gère l'état de connexion et le rôle de l'utilisateur:
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Vérifie l'état de connexion, le rôle de l'utilisateur et si le token a expiré au chargement du composant:
  useEffect(() => {
    const loggedIn = accountService.isLogged();

    if (loggedIn && accountService.isTokenExpired()) {
      accountService.logout();
      setIsLoggedIn(false);
      setIsAdmin(false);
      console.log("[Nav] Déconnexion automatique : token expiré.");
      return;
    }

    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const role = accountService.getRole();
      setIsAdmin(role === 'admin');
      console.log(`[Nav] Utilisateur connecté avec rôle : ${role}`);
    } else {
      console.log("[Nav] Aucun utilisateur connecté.");
    }
  }, []); // Tableau vide signifie que ce useEffect s'exécute uniquement au chargement initial du composant.

  // Fonction pour mettre à jour l'élément sur lequel on a cliqué:
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <nav className="mr-4" aria-label="Navigation principale" role="navigation">
      <ul className="flex md:flex-row sm:flex-row lg:flex-col">
        {/* Routes accessibles par tous */}
        <li className={`${activeIndex === 0 ? 'whiteLink' : 'linkNav'} sm:linkNavSm`}>
          <Link
            to="/"
            onClick={() => handleClick(0)}
            aria-current={activeIndex === 0 ? 'page' : undefined}
            className="text-left"
          >
            Accueil
          </Link>
        </li>
        <li className={`${activeIndex === 1 ? 'whiteLink' : 'linkNav'}`}>
          <Link
            to="/contact"
            onClick={() => handleClick(1)}
            aria-current={activeIndex === 1 ? 'page' : undefined}
            className="text-left"
          >
            Contact
          </Link>
        </li>
        <li className={`${activeIndex === 2 ? 'whiteLink' : 'linkNav'}`}>
          <Link
            to="/comments"
            onClick={() => handleClick(2)}
            aria-current={activeIndex === 2 ? 'page' : undefined}
            className="text-left"
          >
            Commentaires
          </Link>
        </li>
        <li className={`${activeIndex === 3 ? 'whiteLink' : 'linkNav'}`}>
          <Link
            to="/prestations"
            onClick={() => handleClick(3)}
            aria-current={activeIndex === 3 ? 'page' : undefined}
            className="text-left"
          >
            Prestations
          </Link>
        </li>

        {/* Routes accessibles uniquement si l'utilisateur n'est pas connecté */}
        {!isLoggedIn && (
          <li className={`${activeIndex === 5 ? 'whiteLink' : 'linkNav'}`}>
            <Link
              to="/signup"
              onClick={() => handleClick(5)}
              aria-current={activeIndex === 5 ? 'page' : undefined}
              className="text-left"
            >
              S'identifier
            </Link>
          </li>
        )}

        {/* Routes accessibles uniquement si l'utilisateur est connecté */}
        {isLoggedIn && (
          <>
            <li className={`${activeIndex === 6 ? 'whiteLink' : 'linkNav'}`}>
              <Link
                to="/profile"
                onClick={() => handleClick(6)}
                aria-current={activeIndex === 6 ? 'page' : undefined}
                className="text-left"
              >
                Profil
              </Link>
            </li>

            {/* Routes accessibles uniquement par les admins */}
            {isAdmin && (
              <li className={`${activeIndex === 7 ? 'whiteLink' : 'linkNav'}`}>
                <Link
                  to="/admin"
                  onClick={() => handleClick(7)}
                  aria-current={activeIndex === 7 ? 'page' : undefined}
                  className="text-left"
                >
                  Admin
                </Link>
              </li>
            )}

            {/* Route pour la déconnexion */}
            <li className={`${activeIndex === 10 ? 'whiteLink' : 'linkNav'}`}>
              <div
                onClick={() => handleClick(10)}
                className="text-left cursor-pointer"
                aria-label="Déconnexion"
              >
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
