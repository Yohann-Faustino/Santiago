import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { accountService } from "../services/account.service";
import LogoutButton from "./logoutButton";

const Nav = () => {
  // Gère l'état des boutons de la nav pour déterminer lequel à été cliqué en dernier:
  const [activeIndex, setActiveIndex] = useState(null);

  // Gère l'état de connexion ou non afin d'afficher ou non certains éléments de la nav:
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier l'état de connexion à chaque rendu
  useEffect(() => {
    setIsLoggedIn(accountService.isLogged());
  }, []);

  // Fonction qui met à jour activeIndex lorsqu'un élément de navigation est cliqué:
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <nav className="mr-4">
      <ul className=" flex md:flex-row sm:flex-row lg:flex-col">
        {/* Routes accessibles par tous: */}
        <li className={`${activeIndex === 0 ? 'whiteLink' : 'linkNav'} sm:linkNavSm`}>
          <button className=" text-left" onClick={() => handleClick(0)}>
            <Link to="/">Accueil</Link>
          </button>
        </li>
        <li className={`${activeIndex === 1 ? 'whiteLink' : 'linkNav'}`}>
          <button className=" text-left" onClick={() => handleClick(1)}>
            <Link to="/contact">Contact</Link>
          </button>
        </li>
        <li className={`${activeIndex === 2 ? 'whiteLink' : 'linkNav'}`}>
          <button className=" text-left" onClick={() => handleClick(2)}>
            <Link to="/comments">Commentaires</Link>
          </button>
        </li>
        <li className={`${activeIndex === 3 ? 'whiteLink' : 'linkNav'}`}>
          <button className=" text-left" onClick={() => handleClick(3)}>
            <Link to="/prestations">Prestations</Link>
          </button>
        </li>

        {/* Routes accessibles une fois connecté: */}
        {!isLoggedIn && (
          <li className={`${activeIndex === 5 ? 'whiteLink' : 'linkNav'}`}>
            <button className=" text-left" onClick={() => handleClick(5)}>
              <Link to="/signup">S'identifier</Link>
            </button>
          </li>
        )}
        {isLoggedIn && (
          <>
            {/* Routes accessibles si l'user est connecté: */}
            <li className={`${activeIndex === 6 ? 'whiteLink' : 'linkNav'}`}>
              <button className=" text-left" onClick={() => handleClick(6)}>
                <Link to="/profile">Profil</Link>
              </button>
            </li>

            {/* Routes accessibles par l'admin uniquement: */}
            <li className={`${activeIndex === 7 ? 'whiteLink' : 'linkNav'}`}>
              <button className=" text-left" onClick={() => handleClick(7)}>
                <Link to="/admin/dashboard">Admin</Link>
              </button>
            </li>

            {/* Routes pour les éléments de la v2: */}
            {/* <li className={`${activeIndex === 8 ? 'whiteLink' : 'linkNav'}`}>
              <button className=" text-left" onClick={() => handleClick(8)}>
                <Link to="/appointments">Rendez-vous</Link>
              </button>
            </li>
            <li className={`${activeIndex === 9 ? 'whiteLink' : 'linkNav'}`}>
              <button className=" text-left" onClick={() => handleClick(9)}>
                <Link to="/users">Clients</Link>
              </button>
            </li> */}

            {/* Routes déconnexion: */}
            <li className={`${activeIndex === 10 ? 'whiteLink' : 'linkNav'}`}>
              <button className=" text-left" onClick={() => handleClick(10)}>
                <LogoutButton />
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
