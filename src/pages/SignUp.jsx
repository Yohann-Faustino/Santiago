import React, { useState } from "react";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [signupData, setSignupData] = useState({
    lastName: "",
    firstName: "",
    address: "",
    phone: "",
    mailInscription: "",
    passwordInscription: "",
    passwordInscriptionConfirm: ""
  });

  const [loginData, setLoginData] = useState({
    mailConnexion: "",
    passwordConnexion: ""
  });

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    console.log(signupData);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Réponse du serveur :', result);
        alert("Inscription réussie ! Redirection vers la page d'accueil.");
        window.location.href = "/";
      } else {
        const error = await response.json();
        console.error("Erreur lors de l'inscription :", error);
        alert("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log(loginData);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Réponse du serveur :', result);
        alert("Connexion réussie ! Redirection vers la page d'accueil.");
        window.location.href = "/";
      } else {
        const error = await response.json();
        console.error("Erreur lors de la connexion :", error);
        alert("Erreur lors de la connexion. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur lors de la connexion. Veuillez réessayer.");
    }
  };

  return (
    <>
      <h1 className="text-center">Page Connexion/Inscriptions</h1>

      {/* CONTAINER CONNEXION */}
      <div className="connexionBlock relative w-4/5 flex border border-black mx-auto h-2/2">
        {/* CONTAINER GAUCHE SE CONNECTER */}
        <div className={`containerGaucheCo flex flex-col w-1/2 border border-red-700 h-96 justify-center ${isVisible ? "" : "hidden"}`}>
          <h2 className="flex justify-center">Bienvenue !</h2>
          <p className="flex justify-center">Vous n'avez pas encore de compte ?</p>
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
        <div className={`containerDroitCo flex flex-col w-1/2 border border-blue-800 h-96 justify-center ${isVisible ? "" : "hidden"}`}>
          <h2 className="flex justify-center">Se connecter</h2>
          <section className="flex justify-center">
            <i className="fa-brands fa-google-plus-g"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
          </section>
          <section className="flex flex-col">
            <h3 className="flex justify-center">Utiliser votre compte</h3>
            <form onSubmit={handleLoginSubmit} id="formConnexion" action="" method="post" className="flex flex-col">
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="mailConnexion"
                id="mailConnexion"
                placeholder="Votre Email"
                onChange={handleLoginChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="password"
                name="passwordConnexion"
                id="passwordConnexion"
                placeholder="Votre Mot de passe"
                onChange={handleLoginChange}
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
        <div className={`containerGauchInsc flex flex-col border border-lime-600 w-1/2 h-96 justify-center ${isVisible ? "hidden" : ""}`}>
          <h2 className="flex justify-center">Créer un compte</h2>
          <section className="flex justify-center">
            <i className="fa-brands fa-google-plus-g"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
          </section>
          <section>
            <p className="flex justify-center">Veuillez remplir le formulaire d'inscription.</p>
            <form onSubmit={handleSignupSubmit} action="" method="post">
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Nom"
                onChange={handleSignupChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Prénom"
                onChange={handleSignupChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="address"
                id="address"
                placeholder="Adresse"
                onChange={handleSignupChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="phone"
                id="phone"
                placeholder="Téléphone"
                onChange={handleSignupChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="text"
                name="mailInscription"
                id="mailInscription"
                placeholder="Email"
                onChange={handleSignupChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="password"
                name="passwordInscription"
                id="passwordInscription"
                placeholder="Password"
                onChange={handleSignupChange}
                required
              />
              <input
                className="w-1/2 flex mx-auto justify-center"
                type="password"
                name="passwordInscriptionConfirm"
                id="passwordInscriptionConfirm"
                placeholder="Confirmer Password"
                onChange={handleSignupChange}
                required
              />
              <button type="submit" className="w-4/5 flex mx-auto justify-center">
                Créer le compte
              </button>
            </form>
          </section>
        </div>
        {/* CONTAINER DROIT S'INSCRIR */}
        <div className={`containerDroitInsc flex flex-col border border-orange-950 w-1/2 h-96 justify-center ${isVisible ? "hidden" : ""}`}>
          <h2 className="flex justify-center">Vous possédez déjà un compte chez nous?</h2>
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

