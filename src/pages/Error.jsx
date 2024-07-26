import React from "react";
import { Link } from "react-router-dom";
// import animation from "../../src/assets/404.gif";
import animation1 from "../../src/assets/4041.gif";

const Error = () => {
    return (
        <div className="flex flex-col items-center">
            {/* <img src={animation} alt="Error" className="w-2/5" /> */}
            <img src={animation1} alt="Error" className="w-2/5" />
            <p><Link to="/">Retour vers l'<a href="/" className="linkClick mt-4">Accueil</a></Link></p>
        </div>
    );
};

export default Error;
