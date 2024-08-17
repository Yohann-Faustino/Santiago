// On garde deux anime pour que le client choisisse celle qu'il préfère?

import React from "react";
import { Link } from "react-router-dom";
// import animation from "../../src/assets/404.gif";
import animation1 from "../../src/assets/4041.gif";

const Error = () => {
    return (
        <div className="flex flex-col items-center">
            {/* <img src={animation} alt="Error" className="w-2/5" /> */}
            <img src={animation1} alt="Erreur 404 - Page non trouvée" className="w-2/5" />
            <p className="mt-4">
                Retourner à l'
                <Link to="/" className="linkClick">
                    Accueil
                </Link>
            </p>
        </div>
    );
};

export default Error;
