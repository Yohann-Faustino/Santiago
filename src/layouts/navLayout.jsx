import React, { useState } from "react";
import LogoutButton from "../components/logoutButton";
import { Link } from "react-router-dom";

const NavLayout = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <nav className="mr-10">
      <ul>
        {/* Routes accessibles par tous: */}
        <li className={`${activeIndex === 0 ? 'whiteLink' : 'linkNav'} relative`} onClick={() => handleClick(0)}>
          <Link to="/">Accueil</Link>
        </li>
        <li className={`${activeIndex === 1 ? 'whiteLink' : 'linkNav'} relative`} onClick={() => handleClick(1)}>
          <Link to="/contact">Contact</Link>
        </li>
        <li className={`${activeIndex === 2 ? 'whiteLink' : 'linkNav'} relative`} onClick={() => handleClick(2)}>
          <Link to="/comments">Commentaires</Link>
        </li>
        <li className={`${activeIndex === 3 ? 'whiteLink' : 'linkNav'} relative`} onClick={() => handleClick(3)}>
          <Link to="/prestations">Prestations</Link>
        </li>
        <li className={`${activeIndex === 4 ? 'whiteLink' : 'linkNav'} relative`} onClick={() => handleClick(4)}>
          <Link to="/planning">Planning</Link>
        </li>
        <li className={`${activeIndex === 5 ? 'whiteLink' : 'linkNav'} relative`} onClick={() => handleClick(5)}>
          <Link to="/signup">Inscription/connexion</Link>
        </li>

        {/* Routes accessibles si l'user est connecté: */}
        <li className={`${activeIndex === 6 ? 'whiteLink' : 'linkNav'} relative`} onClick={() => handleClick(6)}>
          <Link to="/profile">Profil</Link>
        </li>

        {/* Routes accessibles par l'admin uniquement: */}
        <li className={`${activeIndex === 7 ? 'whiteLink' : 'linkNav'} relative`} onClick={() => handleClick(7)}>
          <Link to="/admin/dashboard">Admin</Link>
        </li>
        <li className={`${activeIndex === 8 ? 'whiteLink' : 'linkNav'} relative`} onClick={() => handleClick(8)}>
          <Link to="/appointments">Rendez-vous</Link>
        </li>
        <li className={`${activeIndex === 9 ? 'whiteLink' : 'linkNav'} relative`} onClick={() => handleClick(9)}>
          <Link to="/users">Clients</Link>
        </li>

        <li className={`${activeIndex === 10 ? 'whiteLink' : 'linkNav'} relative`} onClick={() => handleClick(10)}>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavLayout;
