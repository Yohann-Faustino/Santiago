import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

    return (

        <div className="footer mb-3 w-full">
            <p className="preventionMessage text-center">L 'entretien de votre installation de chauffage est obligatoire, que vous soyez propriétaire ou locataire. Cet entretien améliore la longévité de votre
                appareil, entraîne des économies d'énergie et vous garantit confort et sécurité.</p>
            <div>
                <nav className="footerNav">
                    <ul className=" flex flex-row">
                        <li className=" mx-auto linkClick"><Link to="/legaldisclaimer">Mentions légales</Link></li>
                        <li className=" mx-auto linkClick"><Link to="/sitemap">Plan du site</Link></li>
                        <li className=" mx-auto linkClick"><Link to="/privacypolicy">Politique de Confidentialité</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Footer;