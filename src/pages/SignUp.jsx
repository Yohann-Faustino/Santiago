import React, { useState } from "react";
import AxiosCall from "../services/axiosCall";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { accountService } from "../services/account.service";

const AuthenticationPage = () => {
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
    consent: false // Ajouter un champ pour la case à cocher
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignUpChange = (event) => {
    const { name, type, checked, value } = event.target;
    setSignUpData({ ...signUpData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    if (!signUpData.consent) {
      setErrorMessage("Vous devez consentir à la collecte et au traitement de vos données personnelles.");
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
      return;
    }

    if (!validatePassword(signUpData.password)) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return;
    }

    console.log("Données soumises pour inscription :", signUpData); // Permet de vérifier si les données sont bien saisies.

    try {
      const response = await AxiosCall.post('/signup', signUpData);
      console.log('Réponse de l\'inscription:', response);

      if (response.status === 201) {
        // Sauvegarde du token
        accountService.saveToken(response.data.token);
        console.log('Token sauvegardé:', response.data.token);

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
        const errorData = response.data.message || 'Erreur lors de l\'inscription';
        setErrorMessage(errorData);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer plus tard.');
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await AxiosCall.post('/login', loginData);
      console.log('Réponse de la connexion:', response);

      if (response.status === 200) {
        // Sauvegarde du token
        accountService.saveToken(response.data.token);
        console.log('Token sauvegardé:', response.data.token);

        setLoginData({
          email: '',
          password: ''
        });
        alert('Connexion réussie !');
        navigate('/');
      } else {
        const errorData = response.data.message || 'Erreur lors de la connexion';
        setErrorMessage(errorData);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setErrorMessage('Erreur lors de la connexion. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      
      {isLogin ? (
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <button type="submit">Se connecter</button>
        </form>
      ) : (
        <form onSubmit={handleSignUpSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            value={signUpData.firstname}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            value={signUpData.lastname}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={signUpData.address}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Ville"
            value={signUpData.city}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="text"
            name="postalcode"
            placeholder="Code Postal"
            value={signUpData.postalcode}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Téléphone"
            value={signUpData.phone}
            onChange={handleSignUpChange}
            pattern="[0-9]{10}"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signUpData.email}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={signUpData.password}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmez le mot de passe"
            value={signUpData.confirmPassword}
            onChange={handleSignUpChange}
            required
          />
          <div>
            <input
              type="checkbox"
              name="consent"
              checked={signUpData.consent}
              onChange={handleSignUpChange}
              required
            />
            <label>
              Je consens à la collecte et au traitement de mes données personnelles conformément à la{' '}
              <Link to="/privacypolicy" className="linkClick">Politique de Confidentialité</Link>.
            </label>
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      )}

      <button onClick={() => setIsLogin(true)}>Connexion</button>
      <button onClick={() => setIsLogin(false)}>Inscription</button>
    </div>
  );
};

export default AuthenticationPage;
