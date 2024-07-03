import React from "react";
import LogoutButton from "../components/logoutButton";
import { Link } from "react-router-dom";

const NavLayout = () => {

    return (

        <header>
            <nav>
                <ul>
                    {/* Routes accessibles par tous: */}
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/comments">Commentaires</Link></li>
                    <li><Link to="/prestations">Prestations</Link></li>
                    <li><Link to="/planning">Planning</Link></li>
                    <li><Link to="/signup">Inscription/connexion</Link></li>

                    {/* Routes accessibles si l'user est connecté: */}
                    <li><Link to="/profile">Profil</Link></li>

                    {/* Routes accessibles par l'admin uniquement: */}
                    <li><Link to="/adminBoard">Admin</Link></li>
                    <li><Link to="/appointments">Rendez-vous</Link></li>
                    <li><Link to="/customers">Clients</Link></li>

                    <li><LogoutButton /></li>
                </ul>
            </nav>
        </header>

    );
};

export default NavLayout;