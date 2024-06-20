import React, { useState } from "react";

const SignUp = () => {
  const [isClicked, setIsClicked] = useState(false);

  const changeColor = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <h1 className="text-center">Page Connexion/Inscriptions</h1>

      {/* CONTAINER CONNEXION */}
      <div className="connexionBlock relative w-4/5 flex border border-black mx-auto">
        {/* CONTAINER GAUCHE SE CONNECTER */}
        <div className="containerGaucheCo flex flex-col w-1/2 border border-red-700 justify-center">
          <h2 className="text-center">Bienvenue !</h2>
          <p className="text-center">Vous n'avez pas encore de compte ?</p>
          <p className="text-center">Rejoignez-nous !</p>
          <button
            id="createAccount"
            onClick={changeColor}
            className={`mt-4 bg-${isClicked ? "red" : "blue"}-500 hover:bg-${
              isClicked ? "red" : "blue"
            }-700 text-${isClicked ? "blue" : "white"} font-bold py-2 px-4 rounded w-1/3 mx-auto`}
          >
            Créer un compte
          </button>
        </div>

        {/* CONTAINER DROIT MESSAGE CREER COMPTE */}
        <div className="containerDroitCo flex flex-col w-1/2 border border-blue-800 justify-center">
          <h2 className="text-center">Se connecter</h2>
          <section className="flex justify-center">
            <i className="fab fa-google-plus-g"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin"></i>
          </section>
          <section className="flex flex-col">
            <h3 className="text-center">Utiliser votre compte</h3>
            <form action="" className="flex flex-col">
              <input
                className="w-1/2 mx-auto mb-2"
                type="text"
                name="mailConnexion"
                id="mailConnexion"
                placeholder="Votre Email"
                required
              />
              <input
                className="w-1/2 mx-auto mb-2"
                type="text"
                name="passwordConnexion"
                id="passwordConnexion"
                placeholder="Votre Mot de passe"
                required
              />
            </form>
            <a className="text-center mb-2" href="#">
              Mot de passe oublié?
            </a>
            <button className="w-4/5 mx-auto">Se connecter</button>
          </section>
        </div>
      </div>

      {/* CONTAINER INSCRIPTION */}
      <div className="inscriptionBlock absolute top-100 right-48 flex flex-row w-4/5 mx-auto">
        {/* CONTAINER GAUCHE S'INSCRIRE */}
        <div className="containerGauchInsc flex flex-col border border-lime-600 w-1/2 justify-center">
          <h2 className="text-center">Créer un compte</h2>
          <section className="flex justify-center">
            <i className="fab fa-google-plus-g"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin"></i>
          </section>
          <section>
            <p className="text-center">
              Veuillez remplir le formulaire d'inscription.
            </p>
            <form action="">
              <input
                className="w-1/2 mx-auto mb-2"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Nom"
                required
              />
              <input
                className="w-1/2 mx-auto mb-2"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Prénom"
                required
              />
              <input
                className="w-1/2 mx-auto mb-2"
                type="text"
                name="address"
                id="address"
                placeholder="Adresse"
                required
              />
              <input
                className="w-1/2 mx-auto mb-2"
                type="text"
                name="phone"
                id="phone"
                placeholder="Téléphone"
                required
              />
              <input
                className="w-1/2 mx-auto mb-2"
                type="text"
                name="mailInscription"
                id="mailInscription"
                placeholder="Email"
                required
              />
              <input
                className="w-1/2 mx-auto mb-2"
                type="text"
                name="passwordInscription"
                id="passwordInscription"
                placeholder="Password"
                required
              />
              <input
                className="w-1/2 mx-auto mb-2"
                type="text"
                name="passwordInscriptionConfirm"
                id="passwordInscriptionConfirm"
                placeholder="Confirmer Password"
                required
              />
            </form>
            <button className="w-4/5 mx-auto">Créer le compte</button>
          </section>
        </div>

        {/* CONTAINER DROIT S'INSCRIRE */}
        <div className="containerDroitInsc flex flex-col border border-orange-950 w-1/2 justify-center">
          <h2 className="text-center">
            Vous possédez déjà un compte chez nous ?
          </h2>
          <p className="text-center">Heureux de vous revoir !</p>
          <p className="text-center">connectez-vous ici :</p>
          <button className="w-4/5 mx-auto">Se connecter</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
