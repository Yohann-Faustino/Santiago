const Contact = () => {
  // Composant affichant les informations de contact de l'entreprise
  return (
    <div className="flex flex-col text-center w-full mb-3">
      {/* Titre principal */}
      <h1 className="colorTitle">Contact</h1>

      {/* Coordonnées téléphoniques et email */}
      <ul>
        <li className="colorh2">
          <a href="tel:+33695451933" className="linkClick">
            <span role="img" aria-label="Téléphone">
              📞
            </span>{" "}
            06 95 45 19 33
          </a>
        </li>
        <li className="colorh2">
          <a href="mailto:decp@decp.fr" className="linkClick">
            <span role="img" aria-label="E-mail">
              📧
            </span>{" "}
            decp@decp.fr
          </a>
        </li>
      </ul>

      {/* Carte Google Maps intégrée */}
      <div className="flex justify-center mt-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d328.5586352425636!2d2.4625275033750578!3d48.79202530987224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e60cb78aa0a54d%3A0x81be1a49568d3efd!2s8%20Rue%20d&#39;Estienne%20d&#39;Orves%2C%2094000%20Cr%C3%A9teil!5e0!3m2!1sfr!2sfr!4v1747563639079!5m2!1sfr!2sfr"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Adresse de l'entreprise"
          className="rounded-xl"
        ></iframe>
      </div>

      {/* Informations légales de l'entreprise */}
      <div className="text-sm colorTitle mt-4">
        <p>SIRET : 752 567 859 00018</p>
        <p>TVA : FR 71 752567859</p>
        <p>Code APE : 4322A</p>
      </div>
    </div>
  );
};

export default Contact;
