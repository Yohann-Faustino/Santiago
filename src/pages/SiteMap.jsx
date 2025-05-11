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
                <li>
                    Commentaires
                    <ol className="sub-list">
                        <li><Link to="/comments/list" className="linkClick" aria-label="Liste des commentaires">Liste des Commentaires</Link></li>
                        <li><Link to="/comments/add" className="linkClick" aria-label="Formulaire d'ajout de commentaire">Ajout d'un commentaire</Link></li>
                    </ol>
                </li>
                <li><Link to="/profile" className="linkClick" aria-label="Page de profil utilisateur">Profile (si connecté)</Link></li>
                <li><Link to="/admin/dashboard" className="linkClick" aria-label="Tableau de bord administrateur">Admin (Si connecté en tant qu'administrateur)</Link></li>
                <li><Link to="/prestations" className="linkClick" aria-label="Page des prestations">Prestations</Link></li>
                <li>
                    S'identifier/se déconnecter
                    <ol className="sub-list">
                        <li><Link to="/signup" className="linkClick" aria-label="Page d'inscription">Inscription</Link></li>
                        <li><Link to="/login" className="linkClick" aria-label="Page de connexion">Connexion</Link></li>
                    </ol>
                </li>
                <li><Link to="/legaldisclaimer" className="linkClick" aria-label="Mentions légales de la page">Mentions Légales</Link></li>
                <li><Link to="/sitemap" className="linkClick" aria-label="Plan du site">Plan du site</Link></li>
                <li><Link to="/privacypolicy" className="linkClick" aria-label="Politique de confidentialité">Politique de Confidentialité</Link></li>
            </ol>
        </div>
    );
};

export default SiteMap;
