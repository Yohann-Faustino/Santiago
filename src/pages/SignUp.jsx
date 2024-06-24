import React, { useState } from "react";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    address: "",
    phone: "",
    mailInscription: "",
    passwordInscription: "",
    passwordInscriptionConfirm: ""
  });

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/signup", formData);
      console.log("Réponse du serveur :", response.data);
      alert("Inscription réussie ! Redirection vers la page d'accueil.");
      window.location.href = "/"; // Redirection vers la page d'accueil après inscription
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <>
      <h1 className="text-center">Page Connexion/Inscriptions</h1>

      {/* CONTAINER CONNEXION */}
      <div className="connexionBlock relative w-4/5 flex border border-black mx-auto h-2/2">
        {/* CONTAINER GAUCHE SE CONNECTER */}
        <div
          className={`containerGaucheCo flex flex-col w-1/2 border border-red-700 h-96 justify-center ${isVisible ? "" : "hidden"
            }`}
        >
          <h2 className="flex justify-center">Bienvenue !</h2>
          <p className="flex justify-center">
            Vous n'avez pas encore de compte ?
          </p>
          <p className="flex justify-center">Rejoignez-nous !</p>
          <button
            id="createAccount"
            type="button"
            onClick={toggleVisibility}
            className={`mt-4 bg-red-600 font-bold py-2 px-4 rounded w-1/3 mx-auto`}
          >
            {isVisible ? "Créer un compte" : "Créer un compte"}
          </button>
        </div>

        {/* CONTAINER DROIT MESSAGE CREER COMPTE */}
        <div
          className={`containerDroitCo flex flex-col w-1/2 border border-blue-800 h-96 justify-center ${isVisible ? "" : "hidden"
            }`}
        >
          <h2 className="flex justify-center">Se connecter</h2>
          <section className="flex justify-center">
            <i className="fa-brands fa-google-plus-g"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
          </section>
          <section className="flex flex-col">
            <h3 className="flex justify-center">Utiliser votre compte</h3>
            <form onSubmit={handleSubmit} id="formIscription" action="" method="post" className="flex flex-col">
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="mailConnexion"
                id="mailConnexion"
                placeholder="Votre Email"
                onChange={handleChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="password"
                name="passwordConnexion"
                id="passwordConnexion"
                placeholder="Votre Mot de passe"
                onChange={handleChange}
                required
              />
              <button type="submit" className="w-4/5 flex mx-auto justify-center">
                Se connecter
              </button>
            </form>
            <a className="flex justify-center" href="">
              Mot de passe oublié?
            </a>
          </section>
        </div>
      </div>

      {/* CONTAINER INSCRIPTION */}
      <div className="inscriptionBlock absolute top-100 right-48 flex flex-row w-4/5 mx-auto">
        {/* CONTAINER GAUCHE S'INSCRIR */}
        <div
          className={`containerGauchInsc flex flex-col border border-lime-600 w-1/2 h-96 justify-center ${isVisible ? "hidden" : ""
            }`}
        >
          <h2 className="flex justify-center">Créer un compte</h2>
          <section className="flex justify-center">
            <i className="fa-brands fa-google-plus-g"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
          </section>
          <section>
            <p className="flex justify-center">
              Veuillez remplir le formulaire d'inscription.
            </p>
            <form onSubmit={handleSubmit} action="" method="post">
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Nom"
                onChange={handleChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Prénom"
                onChange={handleChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="address"
                id="address"
                placeholder="Adresse"
                onChange={handleChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="phone"
                id="phone"
                placeholder="Téléphone"
                onChange={handleChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="mailInscription"
                id="mailInscription"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="password"
                name="passwordInscription"
                id="passwordInscription"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="password"
                name="passwordInscriptionConfirm"
                id="passwordInscriptionConfirm"
                placeholder="Confirmer Password"
                onChange={handleChange}
                required
              />
              <button type="submit" className="w-4/5 flex mx-auto justify-center">
                Créer le compte
              </button>
            </form>
          </section>
        </div>
        {/* CONTAINER DROIT S'INSCRIR */}
        <div
          className={`containerDroitInsc flex flex-col border border-orange-950 w-1/2 h-96 justify-center ${isVisible ? "hidden" : ""
            }`}
        >
          <h2 className="flex justify-center">
            Vous possédez déjà un compte chez nous?
          </h2>
          <p className="flex justify-center">Heureux de vous revoir !</p>
          <p className="flex justify-center">connectez-vous ici:</p>
          <button onClick={toggleVisibility} type="button" className="mt-4 bg-red-600 font-bold py-2 px-4 rounded w-1/3 mx-auto">
            Se connecter
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;




