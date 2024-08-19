// Les layout sont des composants qui organisent les autres components.

import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/admin/sideMenu";

const LayoutAdmin = () => {
    return (
        <div className="layoutAdmin">
            <div id="admin" className="admin flex border border-gold m-3 p-2 rounded-lg">
                <SideMenu />
                {/* Outlet composant fourni par react-router-dom utilisé dans les layouts pour afficher les composants enfants qui correspondent à la route actuelle. */}
                <div id="adminBody"><Outlet /></div>
            </div>
        </div>
    );
};

export default LayoutAdmin;