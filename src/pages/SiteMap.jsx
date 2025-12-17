import { Link } from "react-router-dom";

const SiteMap = () => {
  return (
    // Navigation principale du plan du site
    <nav aria-labelledby="sitemap-title">
      <div className="flex flex-col m-auto mb-3">
        <h1 id="sitemap-title" className="colorTitle">
          Plan du site
        </h1>
        <h2 className="colorh2 mb-3">Hiérarchie des pages:</h2>
        <ol className="site-map-list">
          <li>
            <Link to="/" className="linkClick">
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/contact" className="linkClick">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/comments" className="linkClick">
              Liste/ajout de Commentaires
            </Link>
          </li>
          <li>
            <p>Page profile (accessible après connexion)</p>
          </li>
          <li>
            <p>Page administrateur (accessible après connexion)</p>
          </li>
          <li>
            <Link to="/prestations" className="linkClick">
              Prestations
            </Link>
          </li>
          <li>
            <Link to="/signup" className="linkClick">
              Page de connexion/inscription
            </Link>
          </li>
          <li>
            <Link to="/legaldisclaimer" className="linkClick">
              Mentions Légales
            </Link>
          </li>
          <li>
            <Link to="/sitemap" className="linkClick">
              Plan du site
            </Link>
          </li>
          <li>
            <Link to="/privacypolicy" className="linkClick">
              Politique de Confidentialité
            </Link>
          </li>
        </ol>
      </div>
    </nav>
  );
};

export default SiteMap;
