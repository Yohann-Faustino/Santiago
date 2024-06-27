import React, { useState } from 'react';


const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [isLogin, setIsLogin] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  // On utilise deux fonctions disctinctes pour gerer les deux forms séparements sinon a la validation d'un des deux formulaire, le formulaire vide génèrerais une erreur de champs vides.
  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  // On utilise deux fonctions disctinctes pour gerer les deux forms séparements sinon a la validation d'un des deux formulaire, le formulaire vide génèrerais une erreur de champs vides.
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // On utilise cette fonction en front pour faire une prévérification afin d'éviter de surcharger le serveur en demandes de connexions alors qu'il y a des erreurs.
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Fonction de soumission du formulaire d'inscription
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    // Vérification si les passwords correspondent:
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    // Vérification que le mot de passe respecte nos conditions:
    if (!validatePassword(signUpData.password)) {
      alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return;
    }

    try {
      // Envoi de la requête POST au serveur pour l'inscription:
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });

      // Récupération de la réponse du serveur
      const data = await response.json();

      if (response.ok) {
        alert('Inscription réussie, félicitation !');

        // Réinitialisation les champs du formulaire d'inscription:
        setSignUpData({
          firstname: '',
          lastname: '',
          address: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        // Réinitialise le message d'erreur:
        setErrorMessage('');

        // Redirige vers l'accueil après que l'inscription ait réussie.
        window.location.href = '/';
      } else {
        setErrorMessage(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer plus tard.');
    }
  };

  // On utilise deux fonctions disctinctes pour gerer les deux forms séparements sinon a la validation d'un des deux formulaire, le formulaire vide génèrerais une erreur de champs vides.
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      // Envoi de la requête au serveur pour la connexion:
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      // Récupération de la réponse du serveur
      const data = await response.json();

      if (response.ok) {
        alert('Bravo, vous êtes connecté !');
        console.log('Connexion réussie:', data);

        // Stocker le token JWT dans le localStorage
        localStorage.setItem('token', data.token);

        // Réinitialisation les champs du formulaire de connexion:
        setSignUpData({
          email: '',
          password: ''
        });

      // Rediriger vers la page d'accueil après connexion réussie
      window.location.href = '/';

        // Réinitialise le message d'erreur:
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setErrorMessage('Erreur lors de la connexion. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      {!isLogin && (
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
          <button type="submit">S'inscrire</button>
        </form>
      )}

      {isLogin && (
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
      )}
      <button onClick={() => setIsLogin(true)}>Acceder à la partie connexion</button>
      <button onClick={() => setIsLogin(false)}>Acceder à la partie inscription</button>
    </div>
  );
};

export default SignUp;
