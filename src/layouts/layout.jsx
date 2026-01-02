// Les layout sont des composants qui organisent les autres components.

import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* 
        Conteneur principal :
        - Mobile + tablette : nav AU-DESSUS du contenu (flex-col)
        - Desktop : nav À GAUCHE du contenu (flex-row)
      */}
      <div className="flex flex-col lg:flex-row w-full overflow-x-hidden">
        {/* Navigation */}
        <Nav />

        {/* 
          Composant spécial de React Router qui sert de point d’insertion
          pour afficher les composants enfants des routes imbriquées définies dans App.js 
        */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
