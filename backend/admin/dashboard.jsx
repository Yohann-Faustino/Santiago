import React from "react";
import SideMenu from "../components/admin/sideMenu";

// Composant principal du tableau de bord admin
const Dashboard = () => {
    return (

        <div className="dashboard flex flex-col">
            <div className="sideMenu border border-gold rounded-lg p-1">
                <SideMenu />
            </div>
            <main>
                <h1 className=" text-center mb-2 text-red-700">Bienvenue dans la zone administrative.</h1>
                <p className=" text-center p-1">Ici vous pouvez voir la liste des personnes inscrites à votre site ainsi que la liste des commentaires. En choisissant l'un d'entre eux vous pourrez modifier l'un de ces derniers. Si vous souhaitez en supprimer il suffira de cliquer sur la poubelle au début de la ligne.
                </p>
                <p className=" text-center p-1"><span role="img" aria-label="attention">⚠️</span>
                    Attention toute suppression est définitive donc attention a ne pas supprimer la ligne de l'<span className="text-red-700">ADMINISTRATEUR</span>. <span role="img" aria-label="attention">⚠️</span>
                </p>
            </main>
        </div>
        
    );
};

export default Dashboard;