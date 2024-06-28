import React from "react";
import LogoutButton from "./logoutButton";

const Nav = () => {

    return (

        <>
        <ul>
            <li>Accueil</li>
            <li>Contact</li>
            <li>Commentaires</li>
            <li>Prestations</li>
            <li>Planning</li>
            <li>Inscription/connexion</li>
            <li>Profil</li>
            <li><LogoutButton /></li>
        </ul>
        </>

    );
};

export default Nav;