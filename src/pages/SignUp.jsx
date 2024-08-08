import React, { useState } from "react";
import AxiosCall from "../services/axiosCall";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { accountService } from "../services/account.service";

const AuthenticationPage = () => {
  // Le useState gère les valeurs dynamiques et permet de réagir aux interactions et aux modifications de l'user:
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

  // Le useState gère les valeurs dynamiques et permet de réagir aux interactions et aux modifications de l'user:
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Le useState gère l'état de la variable isLogin:
  const [isLogin, setIsLogin] = useState(true); // On s'attends à ce que la plupart des utilisateurs se connectent avant d'aller à l'inscription, alors définir isLogin sur true permet de respecter cette attente dès le début.
  
  // Le useState gère l'état des messages d'erreurs de toute la page afin d'avoir un code simple et propre:
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction qui permet de naviguer entre les pages, elle permet la redirection vers la page accueil une fois connecté ou inscrit:
  const navigate = useNavigate();

  // Fonction qui met à jour signUpData lorsque l'utilisateur saisit des informations dans le formulaire d'inscription:
  const handleSignUpChange = (event) => {
    const { name, type, checked, value } = event.target;
    setSignUpData({ ...signUpData, [name]: type === 'checkbox' ? checked : value }); // Vérifie que la case pour le consentement soit bien cochée.
  };

  // Fonction met à jour loginData lorsque l'utilisateur saisit des informations dans le formulaire de connexion:
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Fonction vérifie que le mot de passe respecte certains critères (au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial):
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Fonction qui soumet les données d'inscription doit être différente de celle de connexion sinon la soumission des deux forms est obligatoire et donc error:
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    // On vérifie si l'utilisateur à coché la case de consentement:
    if (!signUpData.consent) {
      setErrorMessage("Vous devez consentir à la collecte et au traitement de vos données personnelles.");
      return;
    }

    // On vérifie si le password saisie correspond bien a celui du password confirmé:
    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

      // On vérifie si le password respecte les caractéristiques de validitées:
    if (!validatePassword(signUpData.password)) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return;
    }

    // Affiche les données saisies par l'utilisateur pour l'inscription:
    console.log("Données soumises pour inscription :", signUpData);

    // Gère une inscription d'utilisateur après avoir fait les vérifs précédentes:
    try {
      // Envoie une requête POST à l'URL /signup avec les données de l'utilisateur:
      const response = await AxiosCall.post('/signup', signUpData);
      // Affiche la réponse de l'API:
      console.log('Réponse de l\'inscription:', response);

      // Vérifie si la réponse de l'API est positive, ce qui indique que l'inscription est réussie:
      if (response.status === 201) {
        // Sauvegarde le token d'authentification retourné dans la réponse:
        accountService.saveToken(response.data.token);
        // Affiche le token pour voir si c'est ok:
        console.log('Token sauvegardé:', response.data.token);

        // Petit message d'alerte pour prévenir l'utilisateur que son inscription est réussie:
        alert('Inscription réussie !');
        // Réinitialise les données du formulaire d'inscription en les vidant.
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
        setErrorMessage(''); // Efface tout message d'erreur précédent pour que ce soit propre lors d'une nouvelle inscription.
        navigate('/'); // Redirige l'utilisateur vers la page d'accueil.
        // Message d'erreur au cas ou il manquerait des données ou seraient incorrectes:
      } else {
        const errorData = response.data.message || 'Erreur lors de l\'inscription.';
        setErrorMessage(errorData);
      }
      // Message d'erreur au cas ou il y ait un problème de connexion, de reseau ou autre:
    } catch (error) {
      // Affiche le message d'erreur:
      console.error('Erreur lors de l\'inscription:', error);
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer plus tard.');
    }
  };

  // Fonction qui soumet les données de connnexion doit être différente de celle de la l'inscription sinon la soumission des deux forms est obligatoire et donc error:
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // Gère une connexion d'utilisateur:
    try {
      // Envoie une requête POST à l'URL /login avec les données de l'utilisateur:
      const response = await AxiosCall.post('/login', loginData);
      // Affiche la réponse de l'API:
      console.log('Réponse de la connexion:', response);

      // Vérifie si la réponse de l'API est positive, ce qui indique que la connexion est réussie:
      if (response.status === 200) {
        // Sauvegarde le token d'authentification retourné dans la réponse:
        accountService.saveToken(response.data.token);
        // Affiche le token pour voir si c'est ok:
        console.log('Token sauvegardé:', response.data.token);

        // Réinitialise les données du formulaire de connexion en les vidant.
        setLoginData({
          email: '',
          password: ''
        });

        // Petit message d'alerte pour prévenir l'utilisateur que la connexion est réussie:
        alert('Connexion réussie !');
        setErrorMessage(''); // Efface tout message d'erreur précédent pour que ce soit propre lors d'une nouvelle connexion.
        navigate('/'); // Redirige l'utilisateur vers la page d'accueil.
        window.location.reload(); // On rafraîchis la page après la redirection car sinon l'user connecté vois toujours la nav de l'user non connecté.    
      } else {
        // Message d'erreur au cas ou il manquerait des données ou seraient incorrectes:
        const errorData = response.data.message || 'Erreur lors de la connexion.';
        setErrorMessage(errorData);
      }
      // Message d'erreur au cas ou il y ait un problème de connexion, de reseau ou autre:
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setErrorMessage('Erreur lors de la connexion. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="signupBlock text-center w-full flex flex-col items-center">
      {/* Affiche un message d'erreur stylisé qui dépend du useState d'error plus haut: */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <h1 className="text-2xl font-bold mb-6">Connexion/Inscription</h1>
      {/* Vérifie la valeur de isLogin pour déterminer quel formulaire afficher (connexion ou inscription): */}
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
                  className="ml-3"
                />
                <div>
                  <p>Je consens à la collecte et au traitement de mes données personnelles conformément à la{' '}</p>
                  <Link to="/privacypolicy" className="text-blue-500 underline">Politique de Confidentialité</Link>.
                </div>
              </div>
              <button type="submit" className="allButton">S'inscrire</button>
            </form>
          </div>
          <div className="inscriptionRight w-1/2 flex flex-col items-center justify-center bg-red-500 border-4 border-red-500 rounded-tr-lg rounded-br-lg">
            <p className="mt-5 mb-5 text-center">Vous avez déjà un compte ?</p>
            <button type="button" onClick={() => setIsLogin(true)} className="allButton">Connexion</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;
