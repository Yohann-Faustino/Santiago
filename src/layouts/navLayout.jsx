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
      <ul className=" flex md:flex-col sm:flex-row">
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
        {/* <li className={`${activeIndex === 4 ? 'whiteLink' : 'linkNav'}`}>
          <button className=" text-left" onClick={() => handleClick(4)}>
            <Link to="/planning">Planning</Link>
          </button>
        </li> */}
        <li className={`${activeIndex === 5 ? 'whiteLink' : 'linkNav'}`}>
          <button className=" text-left" onClick={() => handleClick(5)}>
            <Link to="/signup">S'identifier</Link>
          </button>
        </li>

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
        {/* <li className={`${activeIndex === 8 ? 'whiteLink' : 'linkNav'}`}>
          <button className=" text-left" onClick={() => handleClick(8)}>
            <Link to="/appointments">Rendez-vous</Link>
          </button>
        </li> */}
        {/* <li className={`${activeIndex === 9 ? 'whiteLink' : 'linkNav'}`}>
          <button className=" text-left" onClick={() => handleClick(9)}>
            <Link to="/users">Clients</Link>
          </button>
        </li> */}

        <li className={`${activeIndex === 10 ? 'whiteLink' : 'linkNav'}`}>
          <button className=" text-left" onClick={() => handleClick(10)}>
            <LogoutButton />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavLayout;
