import Decp from "/assets/decp.png";
import Slider from "../components/slider"; // Slider d’images DECP
import SliderCom from "../components/sliderCom"; // Slider des commentaires clients

const Home = () => {
  return (
    <div className="homeBlock flex flex-col lg:flex-row justify-around">
      {/* Section gauche : présentation et contact */}
      <section className="homeLeftBlock flex-1 p-4 lg:w-1/2">
        {/* Titre avec logo */}
        <h1 className="colorTitle flex items-center">
          La société
          <img
            className="h-4 ml-3 inline-block"
            src={Decp}
            alt="Logo de l'entreprise Decp"
          />
        </h1>

        {/* Présentation de la société */}
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

        {/* Section contact */}
        <h2 className="colorTitle mt-5 mb-3">Contact:</h2>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
          <address>
            <ul>
              <li className="colorh2">
                <a href="tel:+33695451933" className="linkClick">
                  <span role="img" aria-label="phone" className="emoji">
                    📞
                  </span>{" "}
                  06.95.45.19.33
                </a>
              </li>
              <li className="colorh2">
                <a href="mailto:decp@decp.fr" className="linkClick">
                  <span role="img" aria-label="email" className="emoji">
                    📧
                  </span>{" "}
                  decp@decp.fr
                </a>
              </li>
              <li>
                <a href="/contact" className="linkClick">
                  <span role="img" aria-label="adresse" className="emoji">
                    🌏
                  </span>{" "}
                  8 Rue d'Estienne d'Orves, 94000 Créteil
                </a>
              </li>
            </ul>
          </address>

          {/* Informations légales */}
          <div className="text-sm colorTitle">
            <p>SIRET : 752 567 859 00018</p>
            <p>TVA : FR 71 752567859</p>
            <p>Code APE : 4322A</p>
          </div>
        </div>

        {/* Slider commentaires clients */}
        <div className="mt-4">
          <h2 className="colorh2 text-center">Commentaires des clients :</h2>
          <SliderCom />
        </div>
      </section>

      {/* Section droite : présentation détaillée et images */}
      <section className="homeRightBlock flex-1 p-4 lg:w-1/2">
        <h2 className="mt-2 mb-1 colorTitle">
          Recommandé par le célèbre site d'artisans : aude-location.
        </h2>

        <div>
          <p>
            DECP est une entreprise de plomberie située à Créteil depuis plus de
            3 ans. Elle offre un large éventail de services pour tous vos
            travaux et projets de plomberie.
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

        {/* Slider images de l’entreprise */}
        <div className="mt-4">
          <h2 className="colorh2 text-center mb-3">DECP en images :</h2>
          <Slider />
        </div>
      </section>
    </div>
  );
};

export default Home;
