import React from "react";

const Services = () => {

    return (

        <>
        <div className=" flex flex-col m-auto mb-3">
            <h1 className="colorTitle">Prestations</h1>
            <p className="mb-5 colorh2">Entretien, Installation, Rénovation.</p>
            <ul>
                <li><span role="img" aria-label="clé à molette">🔧</span> Chaudières, Chauffage, réseaux de distribution.</li>
                <li><span role="img" aria-label="clé à molette">🔧</span> Centrale d'air.</li>
                <li><span role="img" aria-label="clé à molette">🔧</span> Réseaux VMC (Ramonage et dépoussièrage).</li>
                <li><span role="img" aria-label="clé à molette">🔧</span> Dégorgement tous types.</li>
                <li><span role="img" aria-label="clé à molette">🔧</span> Salle de bains.</li>
                <li><span role="img" aria-label="clé à molette">🔧</span> Nettoyage des gouttières.</li>
                <li><span role="img" aria-label="clé à molette">🔧</span> Travaux électriques.</li>
            </ul>
            </div>
        </>
    );
};

export default Services;