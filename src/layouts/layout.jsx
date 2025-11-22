// Les layout sont des composants qui organisent les autres components.

import React from "react";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (

        <div>
            <Header />
            <div className=" flex sm:flex-col md:flex-col lg:flex-row w-full overflow-x-hidden"> {/* Met l'appli en full screen et cache ce qui depasse */}
                <Nav />
                {/* Composant spécial de React Router qui sert de point d’insertion pour afficher les composants enfants des routes imbriquées définies dans App.js */}
                <Outlet />
            </div>
            <Footer />
        </div>

    );
};

export default Layout;