// Pages des services proposés par DECP

const Services = () => {
  return (
    <>
      <section
        aria-labelledby="services-heading"
        className="flex flex-col m-auto mb-3 m-4"
      >
        <h1 id="services-heading" className="colorTitle">
          Prestations
        </h1>
        <h2 className="mb-5 colorh2">Entretien, Installation, Rénovation.</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <span role="img" aria-hidden="true">
              🔧
            </span>{" "}
            Chaudières, Chauffage, réseaux de distribution.
          </li>
          <li>
            <span role="img" aria-hidden="true">
              🔧
            </span>{" "}
            Centrale d'air.
          </li>
          <li>
            <span role="img" aria-hidden="true">
              🔧
            </span>{" "}
            Réseaux VMC (ramonage et dépoussiérage).
          </li>
          <li>
            <span role="img" aria-hidden="true">
              🔧
            </span>{" "}
            Dégorgement tous types.
          </li>
          <li>
            <span role="img" aria-hidden="true">
              🔧
            </span>{" "}
            Salle de bains.
          </li>
          <li>
            <span role="img" aria-hidden="true">
              🔧
            </span>{" "}
            Nettoyage des gouttières.
          </li>
          <li>
            <span role="img" aria-hidden="true">
              🔧
            </span>{" "}
            Travaux électriques.
          </li>
        </ul>
      </section>
    </>
  );
};

export default Services;
