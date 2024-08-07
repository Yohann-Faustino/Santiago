// Les components sont des composants et le layout est la manière dont sont organisés les components.

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
                {/* Composant spécial de React Router qui récupère les routes du App.js et permet leur rendues: */}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;