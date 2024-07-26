import React, { useState } from "react";
import LogoutButton from "../components/logoutButton";
import { Link } from "react-router-dom";

const NavLayout = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <nav className="mr-2">
      <ul>
        {/* Routes accessibles par tous: */}
        <li className={`${activeIndex === 0 ? 'whiteLink' : 'linkNav'}`}>
          <button className="w-full text-left" onClick={() => handleClick(0)}>
            <Link to="/" className="block w-full h-full">Accueil</Link>
          </button>
        </li>
        <li className={`${activeIndex === 1 ? 'whiteLink' : 'linkNav'}`}>
          <button className="w-full text-left" onClick={() => handleClick(1)}>
            <Link to="/contact" className="block w-full h-full">Contact</Link>
          </button>
        </li>
        <li className={`${activeIndex === 2 ? 'whiteLink' : 'linkNav'}`}>
          <button className="w-full text-left" onClick={() => handleClick(2)}>
            <Link to="/comments" className="block w-full h-full">Commentaires</Link>
          </button>
        </li>
        <li className={`${activeIndex === 3 ? 'whiteLink' : 'linkNav'}`}>
          <button className="w-full text-left" onClick={() => handleClick(3)}>
            <Link to="/prestations" className="block w-full h-full">Prestations</Link>
          </button>
        </li>
        {/* <li className={`${activeIndex === 4 ? 'whiteLink' : 'linkNav'}`}>
          <button className="w-full text-left" onClick={() => handleClick(4)}>
            <Link to="/planning" className="block w-full h-full">Planning</Link>
          </button>
        </li> */}
        <li className={`${activeIndex === 5 ? 'whiteLink' : 'linkNav'}`}>
          <button className="w-full text-left" onClick={() => handleClick(5)}>
            <Link to="/signup" className="block w-full h-full">Inscription/connexion</Link>
          </button>
        </li>

        {/* Routes accessibles si l'user est connecté: */}
        <li className={`${activeIndex === 6 ? 'whiteLink' : 'linkNav'}`}>
          <button className="w-full text-left" onClick={() => handleClick(6)}>
            <Link to="/profile" className="block w-full h-full">Profil</Link>
          </button>
        </li>

        {/* Routes accessibles par l'admin uniquement: */}
        <li className={`${activeIndex === 7 ? 'whiteLink' : 'linkNav'}`}>
          <button className="w-full text-left" onClick={() => handleClick(7)}>
            <Link to="/admin/dashboard" className="block w-full h-full">Admin</Link>
          </button>
        </li>
        <li className={`${activeIndex === 8 ? 'whiteLink' : 'linkNav'}`}>
          <button className="w-full text-left" onClick={() => handleClick(8)}>
            <Link to="/appointments" className="block w-full h-full">Rendez-vous</Link>
          </button>
        </li>
        {/* <li className={`${activeIndex === 9 ? 'whiteLink' : 'linkNav'}`}>
          <button className="w-full text-left" onClick={() => handleClick(9)}>
            <Link to="/users" className="block w-full h-full">Clients</Link>
          </button>
        </li> */}

        <li className={`${activeIndex === 10 ? 'whiteLink' : 'linkNav'}`}>
          <button className="w-full text-left" onClick={() => handleClick(10)}>
            <LogoutButton />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavLayout;
