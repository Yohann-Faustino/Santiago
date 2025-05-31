import React from "react";
import { Link } from "react-router-dom";
import Decp from "/assets/decp.png";
import Slider from "../components/slider";
import SliderCom from "../components/sliderCom";

const Home = () => {
  return (
    <div className="homeBlock flex flex-col lg:flex-row justify-around">
      {/* Section gauche de la page */}
      <div className="homeLeftBlock flex-1 p-4 w-1/2">
        <h1 className="colorTitle flex items-center">
          La société
          <Link to="/legaldisclaimer">
            <img className="h-4 ml-3 inline-block" src={Decp} alt="Decp" />
          </Link>
        </h1>
        <p className="mb-5 colorh2">
          Dégorgement, Entretien, Chauffage, Plomberie.
        </p>
        <p>
          DECP intervient sur les installations collectives et individuelles
          dans le domaine génie climatique.
        </p>
        <p>
          Nous vous proposons des services et des solutions de qualité à tous
          vos problèmes de plomberie, de chauffage (Chaudière à gaz au sol basse
          température, Chaudière murale à gaz, électrique ou à condensation), de
          traitement de l’eau et réseaux aérauliques.
        </p>
        <p>La société s’engage à vous proposer des services avec réactivité.</p>

        <h2 className="colorTitle mt-5 mb-3">Contact:</h2>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
          <div>
            <ul>
              <li className="colorh2">
                <a href="tel:+33695451933" className="linkClick">
                  <span role="img" aria-label="phone" className="emoji">📞</span> 06.95.45.19.33
                </a>
              </li>
              <li className="colorh2">
                <a href="mailto:decp@decp.fr" className="linkClick">
                  <span role="img" aria-label="email" className="emoji">📧</span> decp@decp.fr
                </a>
              </li>
              <li>
                <a href="/contact" className="linkClick">
                  <span role="img" aria-label="adresse" className="emoji">🌏</span> 8 Rue d'Estienne d'Orves, 94000 Créteil
                </a>
              </li>
            </ul>
          </div>

          {/* Informations légales */}
          <div className="text-sm colorTitle">
            <p>SIRET : 752 567 859 00018</p>
            <p>TVA : FR 71 752567859</p>
            <p>Code APE : 4322A</p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="colorh2 text-center">Commentaires des clients :</h2>
          <SliderCom />
        </div>
      </div>

      {/* Section droite de la page */}
      <div className="homeRightBlock flex-1 p-4 w-1/2">
        <h2 className="mt-2 mb-1 colorTitle">
          Recommandé par le célèbre site d'artisans : aude-location.
        </h2>

        {/* Texte descriptif complet sans bouton */}
        <div>
          <p>
            DECP est une entreprise de plomberie située à Créteil depuis plus de
            3 ans. Elle offre un large éventail de services pour tous vos
            travaux et projets de plomberie. DECP propose une gamme complète de
            services pour répondre à tous vos besoins : installation (douche,
            WC, chauffe-eau), entretien chaudière, débouchage canalisations
            etc…
          </p>
          <p>
            Toutes les prestations sont effectuées par des artisans qualifiés
            qui disposent d’un matériel performant et moderne. Leurs tarifs sont
            très accessibles !
          </p>
          <p>
            Les utilisateurs ayant fait appel aux services proposés par DECP
            sont satisfaits du résultat obtenu ! Ils saluent l’excellent rapport
            qualité/prix ainsi que la grande disponibilité des techniciens
            intervenants.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="colorh2 text-center mb-3">DECP en images :</h2>
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Home;
