// Les layout sont des composants qui organisent les autres components.

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../src/components/header";

const LayoutAdmin = () => {
    return (

        <div className="layoutAdmin">
            <main id="admin" className="admin flex-col border border-gold m-3 p-2 rounded-lg" aria-label="contenu principal administrateur">
                <Header />
                <div id="adminBody">
                    {/* Composant spécial de React Router qui sert de point d’insertion pour afficher les composants enfants des routes imbriquées définies dans App.js */}
                    <Outlet />
                </div>
            </main>
        </div>

    );
};

export default LayoutAdmin;