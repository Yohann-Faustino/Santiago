import React from "react";
import { Link } from "react-router-dom";

const SiteMap = () => {
    return (
        <div className="flex flex-col m-auto mb-3">
            <h1 className="colorTitle" role="heading" aria-level="1">Plan du site</h1>
            <h2 className="colorh2 mb-3" role="heading" aria-level="2">Hiérarchie des pages:</h2>
            <ol className="site-map-list" aria-label="Plan du site">
                <li><Link to="/" className="linkClick" aria-label="Accueil de la page principale">Accueil</Link></li>
                <li><Link to="/contact" className="linkClick" aria-label="Page de contact">Contact</Link></li>
                <li><Link to="/comments" className="linkClick" aria-label="Liste/ajout de commentaires">Liste/ajout de Commentaires</Link></li>
                <li><p>Page profile (accessible après connexion)</p></li>
                <li><p>Page administrateur (accessible après connexion)</p></li>
                <li><Link to="/prestations" className="linkClick" aria-label="Page des prestations">Prestations</Link></li>
                <li><Link to="/signup" className="linkClick" aria-label="Page d'inscription">Page de connexion/inscription</Link></li>
                <li><Link to="/legaldisclaimer" className="linkClick" aria-label="Mentions légales de la page">Mentions Légales</Link></li>
                <li><Link to="/sitemap" className="linkClick" aria-label="Plan du site">Plan du site</Link></li>
                <li><Link to="/privacypolicy" className="linkClick" aria-label="Politique de confidentialité">Politique de Confidentialité</Link></li>
            </ol>
        </div >
    );
};

export default SiteMap;
