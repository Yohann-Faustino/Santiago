import React, { useState } from "react";
import LogoutButton from "./logoutButton";
import { Link } from "react-router-dom";

const Nav = () => {
  // Gère l'état des boutons de la nav pour déterminer lequel à été cliqué en dernier:
  const [activeIndex, setActiveIndex] = useState(null);

  // Fonction qui met à jour activeIndex lorsqu'un élément de navigation est cliqué:
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  // Lorsque l'utilisateur clique sur le bouton la fonction handleClick est appelée avec son chiffre attribué.
  // La fonction handleClick met à jour l'état activeIndex avec le chiffre de l'élément cliqué.
  // Ainsi l'on vérifie si le chiffre attribué au bouton fraichement cliqué correspond à celui du activeIndex.
  // Si les chiffres ne correspondent pas on applique la classe whiteLink à la place de la classe linkNav.
  // Si les chiffres correspondent on laisse la classe whiteLink pour indiquer que l'élément cliqué est actif.

  return (
    <nav className="mr-4">
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

export default Nav;
