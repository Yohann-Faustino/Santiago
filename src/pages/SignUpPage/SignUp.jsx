import React, { useState } from "react";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <h1 className="text-center">Page Connexion/Inscriptions</h1>

      {/* CONTAINER CONNEXION */}
      <div className="connexionBlock relative w-4/5 flex border border-black mx-auto h-2/2">
        {/* CONTAINER GAUCHE SE CONNECTER */}
        <div
          className={`containerGaucheCo flex flex-col w-1/2 border border-red-700 h-96 justify-center ${
            isVisible ? "" : "hidden"
          }`}
        >
          <h2 className="flex justify-center">Bienvenue !</h2>
          <p className="flex justify-center">
            Vous n'avez pas encore de compte ?
          </p>
          <p className="flex justify-center">Rejoignez-nous !</p>
          <button
            id="createAccount"
            onClick={toggleVisibility}
            className={`mt-4 bg-red-600 font-bold py-2 px-4 rounded w-1/3 mx-auto`}
          >
            {isVisible ? "Créer un compte" : "Créer un compte"}
          </button>
        </div>

        {/* CONTAINER DROIT MESSAGE CREER COMPTE */}
        <div
          className={`containerDroitCo flex flex-col w-1/2 border border-blue-800 h-96 justify-center ${
            isVisible ? "" : "hidden"
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
            <form action="" className="flex flex-col">
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="mailConnexion"
                id="mailConnexion"
                placeholder="Votre Email"
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="passwordConnexion"
                id="passwordConnexion"
                placeholder="Votre Mot de passe"
                required
              />
            </form>
            <a className="flex justify-center" href="">
              Mot de passe oublié?
            </a>
            <button className="w-4/5 flex mx-auto justify-center">
              Se connecter
            </button>
          </section>
        </div>
      </div>

      {/* CONTAINER INSCRIPTION */}
      <div className="inscriptionBlock absolute top-100 right-48 flex flex-row w-4/5 mx-auto">
        {/* CONTAINER GAUCHE S'INSCRIR */}
        <div
          className={`containerGauchInsc flex flex-col border border-lime-600 w-1/2 h-96 justify-center ${
            isVisible ? "hidden" : ""
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
            <form action="">
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Nom"
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Prénom"
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="address"
                id="address"
                placeholder="Adresse"
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="phone"
                id="phone"
                placeholder="Téléphone"
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="mailInscription"
                id="mailInscription"
                placeholder="Email"
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="passwordInscription"
                id="passwordInscription"
                placeholder="Password"
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="passwordInscriptionConfirm"
                id="passwordInscriptionConfirm"
                placeholder="Confirmer Password"
                required
              />
            </form>
            <button className="w-4/5 flex mx-auto justify-center">
              Créer le compte
            </button>
          </section>
        </div>
        {/* CONTAINER DROIT S'INSCRIR */}
        <div
          className={`containerDroitInsc flex flex-col border border-orange-950 w-1/2 h-96 justify-center ${
            isVisible ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center">
            Vous possédez déjà un compte chez nous?
          </h2>
          <p className="flex justify-center">Heureux de vous revoir !</p>
          <p className="flex justify-center">connectez-vous ici:</p>
          <button onClick={toggleVisibility} className="mt-4 bg-red-600 font-bold py-2 px-4 rounded w-1/3 mx-auto">
            Se connecter
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;




