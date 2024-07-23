import React from "react";
import { Link } from "react-router-dom";

const FooterLayout = () => {

    return (

        <div className="footer">
            <p className="preventionMessage mt-5 mb-5 text-center">L 'entretien de votre installation de chauffage est obligatoire, que vous soyez propriétaire ou locataire. Cet entretien améliore la longévité de votre
                appareil, entraîne des économies d'énergie et vous garantit confort et sécurité.</p>
            <div>
                <nav className="footerNav">
                    <ul className=" flex flex-row">
                        <li className=" mx-auto"><Link to="/legaldisclaimer">Mentions légales</Link></li>
                        <li className=" mx-auto"><Link to="/sitemap">Plan du site</Link></li>
                        <li className=" mx-auto"><Link to="/privacypolicy">Politique de Confidentialité</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default FooterLayout;