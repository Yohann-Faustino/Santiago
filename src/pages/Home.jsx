import React, { useState } from "react";
import { Link } from "react-router-dom";
import Decp from "../assets/decp.png";
import Slider from "../components/slider";
import SliderCom from "../components/sliderCom";

const Home = () => {
  // État pour gérer l'affichage du texte "Voir plus et "Voir moins":
  const [showMore, setShowMore] = useState(false);

  // Fonction pour basculer l'état entre "Voir plus" et "Voir moins":
  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="homeBlock flex flex-col lg:flex-row w-full">
      {/* Section gauche de la page */}
      <div className="homeLeftBlock w-full lg:w-2/5 p-4 mr-8">
        <h1 className="colorTitle flex items-center">
          La société
          {/* Lien vers la page des mentions légales avec le logo */}
          <Link to="/legaldisclaimer">
            <img className="h-4 ml-3 inline-block" src={Decp} alt="Decp" />
          </Link>
        </h1>
        <p className="mb-5 colorh2">Dégorgement, Entretien, Chauffage, Plomberie.</p>
        <p>
          DECP intervient sur les installations collectives et individuelles dans le domaine génie climatique.
        </p>
        <p>
          Nous vous proposons des services et des solutions de qualité à tous vos problèmes de plomberie, de chauffage
          (Chaudière à gaz au sol basse température, Chaudière murale à gaz, électrique ou à condensation), de traitement
          de l’eau et réseaux aérauliques.
        </p>
        <p>La société s’engage à vous proposer des services avec réactivité.</p>

        <div className="mt-1">
          <h2 className="colorh2 text-center">Commentaires des clients:</h2>
          <SliderCom /> {/* Slider pour afficher les commentaires des clients*/}
        </div>
      </div>

      {/* Section droite de la page */}
      <div className="homeRightBlock w-full lg:w-2/5 p-4">
        <h2 className="colorTitle">Contact:</h2>
        <p className="colorh2 mb-3">24 HEURES SUR 24 / 7 JOURS SUR 7</p>
        <ul>
          <li className="colorh2">
            <a href="tel:+33695451933" className="linkClick">
              📞 06.95.45.19.33
            </a>
          </li>
          <li className="colorh2">
            <a href="mailto:decp@decp.fr" className="linkClick">
              📧 decp@decp.fr
            </a>
          </li>
        </ul>
        <h2 className="mt-2 mb-1 colorTitle">Recommandé par le célèbre site d'artisans: aude-location.</h2>

        {/* Texte avec la fonctionnalité "Voir plus et "Voir moins" */}
        <div>
          <p>
            {/* Texte visible avant showMore" */}
            DECP est une entreprise de plomberie située à Créteil depuis plus de 3 ans.
            {showMore && (
              <>
                {/* Texte caché après showMore" */}
                {" "}Elle offre un large éventail de services pour tous vos travaux et projets de plomberie. DECP propose une gamme complète de services pour répondre
                à tous vos besoins : installation (douche, WC, chauffe-eau), entretien chaudière, débouchage canalisations etc…
                <p>
                  Toutes les prestations sont effectuées par des artisans qualifiés qui disposent d’un matériel performant et
                  moderne. Leurs tarifs sont très accessibles !
                </p>
                <p>
                  Les utilisateurs ayant fait appel aux services proposés par DECP sont satisfaits du résultat obtenu ! Ils
                  saluent l’excellent rapport qualité/prix ainsi que la grande disponibilité des techniciens intervenants.
                </p>
                <button onClick={handleToggle} className="text-blue-500 underline">
                  Voir moins
                </button>
              </>
            )}
            {!showMore && (
              <button onClick={handleToggle} className="text-blue-500 underline ml-1">
                Voir plus
              </button>
            )}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="colorh2 text-center mb-3">DECP en images:</h2>
          <Slider /> {/* Slider pour afficher des images */}
        </div>
      </div>
    </div>
  );
};

export default Home;
