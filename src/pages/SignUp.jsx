import React, { useState } from "react";
import AxiosCall from "../services/axiosCall";
import { useNavigate, Link } from "react-router-dom";
import { accountService } from "../services/account.service";

const AuthenticationPage = () => {
  // Gestion des données d'inscription et de connexion via useState
  const [signUpData, setSignUpData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    postalcode: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    consent: false
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [isLogin, setIsLogin] = useState(true); // Par défaut, affichage du formulaire de connexion
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Mise à jour des données d'inscription
  const handleSignUpChange = (event) => {
    const { name, type, checked, value } = event.target;
    setSignUpData({ ...signUpData, [name]: type === 'checkbox' ? checked : value });
  };

  // Mise à jour des données de connexion
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Validation du mot de passe
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Soumission du formulaire d'inscription
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    // Vérification du consentement
    if (!signUpData.consent) {
      setErrorMessage("Vous devez consentir à la collecte et au traitement de vos données personnelles.");
      return;
    }

    // Vérification des mots de passe
    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    // Validation du mot de passe
    if (!validatePassword(signUpData.password)) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return;
    }

    try {
      // Envoi des données d'inscription
      const response = await AxiosCall.post('/signup', signUpData);

      if (response.status === 201) {
        // Sauvegarde du token d'authentification
        accountService.saveToken(response.data.token);

        alert('Inscription réussie !');
        setSignUpData({
          firstname: '',
          lastname: '',
          address: '',
          city: '',
          postalcode: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: '',
          consent: false
        });
        setErrorMessage('');
        navigate('/');
      } else {
        setErrorMessage(response.data.message || 'Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer plus tard.');
    }
  };

  // Soumission du formulaire de connexion
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      // Envoi des données de connexion
      const response = await AxiosCall.post('/login', loginData);

      if (response.status === 200) {
        // Sauvegarde du token d'authentification
        accountService.saveToken(response.data.token);

        setLoginData({ email: '', password: '' });
        alert('Connexion réussie !');
        setErrorMessage('');
        navigate('/');
        window.location.reload(); // Rafraîchissement de la page pour mettre à jour l'état de l'utilisateur
      } else {
        setErrorMessage(response.data.message || 'Erreur lors de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setErrorMessage('Erreur lors de la connexion. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="signupBlock text-center w-full flex flex-col items-center">
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <h1 className="text-2xl font-bold mb-6">Connexion/Inscription</h1>

      {isLogin ? (
        <div className="connexionBlock flex w-11/12">
          <div className="connexionLeft w-1/2 flex flex-col items-center justify-center bg-yellow-300 border-4 border-yellow-300 rounded-tl-lg rounded-bl-lg">
            <p className="mt-5 mb-5 text-center">Heureux de vous revoir !</p>
            <form onSubmit={handleLoginSubmit} className="flex flex-col w-2/3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="border p-2 mb-4 rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="border p-2 mb-4 rounded"
              />
              <button type="submit" className="allButton">Se connecter</button>
            </form>
          </div>
          <div className="connexionRight w-1/2 flex flex-col items-center justify-center bg-red-500 border-4 border-red-500 rounded-tr-lg rounded-br-lg">
            <p className="mt-5 mb-5 text-center">Pas de compte chez nous ?</p>
            <button type="button" onClick={() => setIsLogin(false)} className="allButton">Inscription</button>
          </div>
        </div>
      ) : (
        <div className="inscriptionBlock flex w-11/12">
          <div className="inscriptionLeft w-1/2 flex flex-col items-center justify-center bg-yellow-300 border-4 border-yellow-300 rounded-tl-lg rounded-bl-lg">
            <p className="mt-5 mb-5 text-center">Bienvenue, inscrivez-vous !</p>
            <form onSubmit={handleSignUpSubmit} className="flex flex-col">
              <div className="inputsForm flex flex-col items-center justify-center">
                <input
                  type="text"
                  name="firstname"
                  placeholder="Prénom"
                  value={signUpData.firstname}
                  onChange={handleSignUpChange}
                  required
                  className="inputHeight border p-2 mb-4 rounded"
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Nom"
                  value={signUpData.lastname}
                  onChange={handleSignUpChange}
                  required
                  className="inputHeight border p-2 mb-4 rounded"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Adresse"
                  value={signUpData.address}
                  onChange={handleSignUpChange}
                  required
                  className="inputHeight border p-2 mb-4 rounded"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Ville"
                  value={signUpData.city}
                  onChange={handleSignUpChange}
                  required
                  className="inputHeight border p-2 mb-4 rounded"
                />
                <input
                  type="text"
                  name="postalcode"
                  placeholder="Code Postal"
                  value={signUpData.postalcode}
                  onChange={handleSignUpChange}
                  required
                  className="inputHeight border p-2 mb-4 rounded"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Téléphone"
                  value={signUpData.phone}
                  onChange={handleSignUpChange}
                  pattern="[0-9]{10}"
                  required
                  className="inputHeight border p-2 mb-4 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  required
                  className="inputHeight border p-2 mb-4 rounded"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  required
                  className="inputHeight border p-2 mb-4 rounded"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmez le mot de passe"
                  value={signUpData.confirmPassword}
                  onChange={handleSignUpChange}
                  required
                  className="inputHeight border p-2 mb-4 rounded"
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="consent"
                  checked={signUpData.consent}
                  onChange={handleSignUpChange}
                  required
                  className="mr-2"
                />
                <label htmlFor="consent">J'accepte les conditions d'utilisation</label>
              </div>
              <button type="submit" className="allButton">S'inscrire</button>
            </form>
          </div>
          <div className="inscriptionRight w-1/2 flex flex-col items-center justify-center bg-red-500 border-4 border-red-500 rounded-tr-lg rounded-br-lg">
            <p className="mt-5 mb-5 text-center">Déjà un compte ?</p>
            <button type="button" onClick={() => setIsLogin(true)} className="allButton">Connexion</button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <Link to="/">Retour à la page d'accueil</Link>
      </div>
    </div>
  );
};

export default AuthenticationPage;
