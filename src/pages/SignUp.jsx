import React, { useState } from "react";
import AxiosCall from "../services/axiosCall";
import { useNavigate, Link } from "react-router-dom";
import { accountService } from "../services/account.service";
import ReCAPTCHA from "react-google-recaptcha";

const AuthenticationPage = () => {
  // Surveille et met à jour le code qui proviens des éléments de l'inscription:
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

  // useState pour gérer l'état de chargement lors des appels API (chargement en cour...):
  const [loading, setLoading] = useState(false);

  // Ajouter un état pour le token captcha
  const [captchaToken, setCaptchaToken] = useState(null);

  // Surveille et met à jour le code qui proviens des éléments de la connexion:
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Surveille l'état du form actuel affiché inscription ou connexion et on bascule de l'un à l'autre grâce aux boutons.
  const [showForm, setShowForm] = useState(true);

  // Centralisation des messages d'erreurs et évite qu'on recharge la page pour les afficher:
  const [errorMessage, setErrorMessage] = useState('');

  // Gère le message de la réussite à l'inscription ou connexion
  const [successMessage, setSuccessMessage] = useState('');

  // Permet de rediriger l'user vers la page choisie dans la suite du code:
  const navigate = useNavigate();

  // Mise à jour des données d'inscription:
  const handleSignUpChange = (event) => {
    const { name, type, checked, value } = event.target;
    setSignUpData({ ...signUpData, [name]: type === 'checkbox' ? checked : value });
    /* "..." conserve toutes les données existantes dans signUpData (destructuration).
     On trouve les names et on modifie leurs valeurs si la case est cochée (checkbox).*/
  };

  // Mise à jour des données de connexion:
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
    /* "..." conserve toutes les données existantes dans loginData (destructuration).
     On trouve les names et on modifie leurs valeurs.*/
  };

  // Validation du mot de passe:
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Permet de voir/cacher le mdp de la page connexionn
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Permet de voir/cacher les mdp de la page inscription
  const [showPasswords, setShowPasswords] = useState(false);

  // Soumission du formulaire d'inscription:
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Vérification du captcha
    if (!captchaToken) {
      setErrorMessage("Veuillez valider le CAPTCHA.");
      setLoading(false);
      return;
    }

    // Vérification du consentement:
    if (!signUpData.consent) {
      setErrorMessage("Vous devez consentir à la collecte et au traitement de vos données personnelles.");
      setLoading(false);
      return;
    }

    // Vérification des mots de passe:
    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    // Validation du mot de passe:
    if (!validatePassword(signUpData.password)) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      setLoading(false);
      return;
    }

    try {
      // Envoi des données d'inscription:
      const response = await AxiosCall.post('/signup', {
        ...signUpData,
        captchaToken
      });

      if (response.status === 201) {
        // Sauvegarde du token d'authentification:
        accountService.saveToken(response.data.token);

        // Sauvegarde du rôle de l'utilisateur dans le localStorage:
        localStorage.setItem('role', response.data.user.role); // Permet de stocker  le role.

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

        // On met 2 secondes de latence pour que l'user vois que son inscription a bien fonctionné
        setSuccessMessage('Inscription réussie !');
        setErrorMessage('');

        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
        navigate('/signup');

        // On peut basculer sur le formulaire de connexion automatiquement après inscription réussie
        setShowForm(true);
      } else {
        setErrorMessage(response.data.message || 'Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  // Soumission du formulaire de connexion:
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Envoi des données de connexion:
      const response = await AxiosCall.post('/login', loginData);

      if (response.status === 200) {
        // Sauvegarde du token d'authentification:
        accountService.saveToken(response.data.token);

        // Vérifie si l'objet user et le rôle existent:
        if (response.data.user && response.data.user.role) {
          // Sauvegarde du rôle de l'utilisateur dans le localStorage:
          localStorage.setItem('role', response.data.user.role); // Permet de stocker le role.
        } else {
          console.warn("Les informations de rôle sont manquantes dans la réponse.");
          localStorage.setItem('role', 'roleParDefaut'); // Permet de stocker le role.
        }

        setLoginData({ email: '', password: '' });

        // On met 2 secondes de latence pour que l'user vois que sa connexion a bien fonctionné
        setSuccessMessage('Connexion réussie !');
        setErrorMessage('');

        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
          window.location.reload();// Rafraîchissement de la page pour mettre à jour l'état de l'utilisateur sinon il est considéré comme non connecté.
        }, 2000);
      } else {
        setErrorMessage(response.data.message || 'Erreur lors de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setErrorMessage('Erreur lors de la connexion. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer le changement du captcha:
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };


  return (
    <div className="signupBlock m-auto text-center">
      {errorMessage && <div role="alert" aria-live="assertive" className="errorMessage">{errorMessage}</div>}

      <h1 className="colorTitle mb-5">Connexion/Inscription</h1>

      {successMessage && <p className="text-green-600" role="alert" aria-live="polite">{successMessage}</p>}

      {showForm ? (
        <div className="connexionBlock flex gap-x-4">
          <div className="connexionLeft border border-red-500 rounded-lg p-2">
            <p className="connexionText">Heureux de vous revoir !</p>
            <form onSubmit={handleLoginSubmit} className="formBlock flex flex-col">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="inputField border rounded-lg p-2 mb-1"
                aria-label="Adresse email"
              />
              <div className="inputPasswordWrapper">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mot de passe"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="inputField border rounded-lg p-2 mb-1"
                  aria-label="Mot de passe"
                />
                <span
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="togglePassword"
                >
                  {showLoginPassword ? "🙈" : "👁️"}
                </span>
              </div>
              <p className=" mb-1">
                <Link to="/forgot-password">
                  Mot de passe oublié ?
                </Link>
              </p>
              <button type="submit" className="allButton" aria-label="Se connecter">Se connecter</button>
            </form>
          </div>
          <div className="connexionRight border border-blue-700 rounded-lg p-2">
            <p className="connexionText mt-10">Pas de compte chez nous ?</p>
            <button
              type="button"
              className="allButton"
              aria-label="Allez vers l'inscription"
              onClick={() => {
                setShowForm(false);
                setErrorMessage('');
                setSuccessMessage('');
              }}
            >
              {loading ? 'Connexion...' : 'Connecté'}
            </button>
          </div>
        </div>
      ) : (
        <div className="inscriptionBlock flex text-center gap-x-4">
          <div className=" border border-blue-600 rounded-lg p-2">
            <p className="inscriptionText">Bienvenue, inscrivez-vous !</p>
            <form onSubmit={handleSignUpSubmit} className="formBlock">
              <div className="inputsForm flex">
                <div className=" flex flex-col">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Prénom"
                    value={signUpData.firstname}
                    onChange={handleSignUpChange}
                    required
                    className="inputField border rounded-lg p-2"
                    aria-label="Prénom"
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Nom"
                    value={signUpData.lastname}
                    onChange={handleSignUpChange}
                    required
                    className="inputField border rounded-lg p-2"
                    aria-label="Nom"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={signUpData.address}
                    onChange={handleSignUpChange}
                    required
                    className="inputField border rounded-lg p-2"
                    aria-label="Adresse postale"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Ville"
                    value={signUpData.city}
                    onChange={handleSignUpChange}
                    required
                    className="inputField border rounded-lg p-2"
                    aria-label="Ville"
                  />
                  <input
                    type="text"
                    name="postalcode"
                    placeholder="Code Postal"
                    value={signUpData.postalcode}
                    onChange={handleSignUpChange}
                    required
                    className="inputField border rounded-lg p-2"
                    aria-label="Code postal"
                  />
                </div>
                <div className=" flex flex-col">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Téléphone"
                    value={signUpData.phone}
                    onChange={handleSignUpChange}
                    pattern="[0-9]{10}"
                    required
                    className="inputField border rounded-lg p-2"
                    aria-label="Numéro de téléphone"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    required
                    className="inputField border rounded-lg p-2"
                    aria-label="Adresse email"
                  />

                  <input
                    type={showPasswords ? "text" : "password"}
                    name="password"
                    placeholder="Mot de passe"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    required
                    className="inputField border rounded-lg p-2"
                    aria-label="Mot de passe"
                  />
                  <input
                    type={showPasswords ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirmez le mot de passe"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    required
                    className="inputField border rounded-lg p-2"
                    aria-label="Confirmation du mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="togglePassword"
                    aria-label="Afficher ou masquer le mot de passe"
                  >
                    {showPasswords ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="consentBlock m-2">
                <input
                  type="checkbox"
                  name="consent"
                  checked={signUpData.consent}
                  onChange={handleSignUpChange}
                  required
                  className="consentCheckbox"
                  aria-label="Consentement à la collecte des données"
                />
                <label htmlFor="consent">J'accepte les conditions d'utilisation</label>
              </div>
              <div className="  flex justify-center">
                <ReCAPTCHA
                  // Clef récupérée sur Google ReCaptcha
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                />
              </div>
              <button
                type="submit"
                className="allButton"
                aria-label="S'inscrire"
                disabled={loading}
              >
                {loading ? 'Inscription en cour...' : 'Inscription réussite'}
              </button>
            </form>
          </div>

          <div className="inscriptionRight border border-red-500 rounded-lg p-2">
            <p className="inscriptionText mt-10">Déjà un compte ?</p>
            <button type="button" onClick={() => {
              setShowForm(true);
              setErrorMessage('');
              setSuccessMessage('');
            }} className="allButton" aria-label="Retour à la connexion">Connexion</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AuthenticationPage;
