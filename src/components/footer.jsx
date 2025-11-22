import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer mb-3 mt-1 w-full" role="contentinfo">
            <p className="preventionMessage text-center">
                L'entretien de votre installation de chauffage est obligatoire, que vous soyez propriétaire ou locataire. Il prolonge la durée de vie de votre appareil, réduit votre consommation d'énergie, et vous assure confort et sécurité.</p>
            <nav className="footerNav" aria-label="Navigation du pied de page">
                <ul className="flex flex-row">
                    <li className="mx-auto linkClick"><Link to="/legaldisclaimer">Mentions légales</Link></li>
                    <li className="mx-auto linkClick"><Link to="/sitemap">Plan du site</Link></li>
                    <li className="mx-auto linkClick"><Link to="/privacypolicy">Politique de Confidentialité</Link></li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
