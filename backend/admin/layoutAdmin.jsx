// Les layout sont des composants qui organisent les autres components.

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../src/components/header";

const LayoutAdmin = () => {
    return (

        <div className="layoutAdmin">
            <div id="admin" className="admin flex-col border border-gold m-3 p-2 rounded-lg">
                <div>
                    <Header />
                </div>
                
                {/* Outlet composant fourni par react-router-dom utilisé dans les layouts pour afficher les composants enfants qui correspondent à la route actuelle. */}
                <div id="adminBody"><Outlet /></div>
            </div>
        </div>
    );
};

export default LayoutAdmin;