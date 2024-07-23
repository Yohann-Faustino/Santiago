import React from "react";
import { Link } from "react-router-dom";
import Decp from "../assets/decp.png";

const Home = () => {

    return (

        <div className="homeBlock flex flex-row">
            <div className="homeLeftBlock w-1/2">
                <h1 className=" colorTitle flex flex-row">La société<Link to="/legaldisclaimer"><img className="h-4 ml-3" src={Decp} alt="Nom de l'entreprise" /></Link></h1>
                <p className=" mb-5 colorh2" >Dégorgement, Entretien, Chauffage, Plomberie.</p>
                <p>DECP intervient sur les installations collectives et individuelles dans le domaine génie climatique.</p>
                <p>Nous vous proposons des services et des solutions de qualités à tous vos problèmes de plomberie, de chauffage (Chaudière à gaz au sol basse température, Chaudière murale à gaz, électrique ou à condensation), de traitement de l’eau et réseaux aérauliques.</p>
                <p>La société s’engage à vous proposer des services avec réactivité.</p>

                <h2 className="mt-5 colorTitle">Services:</h2>
                <p className=" mb-5 colorh2">Entretien, Installation, Rénovation.</p>
                <ul>
                    <li>🔧 Chaudières, Chauffage, réseaux de distribution.</li>
                    <li>🔧 Centrale d'air.</li>
                    <li>🔧 Réseaux VMC (Ramonage et dépoussièrage).</li>
                    <li>🔧 Dégorgement tous types.</li>
                    <li>🔧 Salle de bains.</li>
                    <li>🔧 Nettoyage des gouttières.</li>
                    <li>🔧 Travaux électriques.</li>
                </ul>
            </div>
            <div className="homeRigthBlock w-1/2 ml-5">
                <h2 className=" colorTitle">Contact:</h2>
                <ul>
                    <li className=" colorh2">24 HEURES SUR 24 / 7 JOURS SUR 7</li>
                    <li className=" colorh2"><a href="tel:+33695451933"> 📞 06.95.45.19.33</a></li>
                    <li className=" colorh2"><a href="mailto:decp@decp.fr">📧 decp@decp.fr</a></li>
                </ul>
                <h2 className=" mt-5 mb-5 colorTitle">Apparut sur le site de recommandation d'artisants aude-location:</h2>
                {/* https://www.aude-location.fr/quel-est-le-meilleur-plombier-de-creteil/ */}
                <p>DECP est une entreprise de plomberie située à Créteil depuis plus de 3 ans. Elle offre un large éventail de services pour tous vos travaux et projets de plomberie. DECP propose une gamme complète de services pour répondre à tous vos besoins : installation (douche, WC, chauffe-eau), entretien chaudière, débouchage canalisations etc… </p>
                <p>Toutes les prestations sont effectuées par des artisans qualifiés qui disposent d’un matériel performant et modernes. Leurs tarifs sont très accessibles ! </p>
                <p>Les utilisateurs ayant fait appel aux services proposés par DECP sont satisfaits du résultat obtenu ! Ils saluent l’excellent rapport qualité/prix ainsi que la grande disponibilité des techniciens intervenants.</p>
            </div>
        </div>);
};

export default Home;