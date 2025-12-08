import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="sideMenu border border-red-700 rounded-lg p-2">
      <ul className="flex flex-row justify-center gap-6">
        <li className="linkClick">
          <Link to="/admin/users/indexuser" className="hover:text-red-700">
            Liste des utilisateurs
          </Link>
        </li>
        <li className="linkClick">
          <Link
            to="/admin/comments/indexcomments"
            className="hover:text-red-700"
          >
            Liste des commentaires
          </Link>
        </li>
        <li className="linkClick">
          <Link to="/" className="hover:text-red-700">
            Retour à l'Accueil
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
