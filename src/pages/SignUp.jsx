import React, { useState } from 'react';

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    console.log(signUpData);
    // Logic for sign-up submission
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inscription réussie:', data);
      } else {
        console.log('Erreur lors de l\'inscription:', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log(loginData);
    // Logic for login submission
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Connexion réussie:', data);
      } else {
        console.log('Erreur lors de la connexion:', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <div>
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
        <button type="submit">S'inscrire</button>
      </form>

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
    </div>
  );
};

export default SignUp;

