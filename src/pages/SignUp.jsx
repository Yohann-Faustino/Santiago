// import React, { useState } from 'react';

// const SignUp = () => {
//   const [signUpData, setSignUpData] = useState({
//     firstname: '',
//     lastname: '',
//     address: '',
//     phone: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: ''
//   });

//   // On récupère la valeur de l'identifiant dans le form de connexion:
//   const [isLogin, setIsLogin] = useState(true);

//   const [errorMessage, setErrorMessage] = useState('');

//   // On utilise deux fonctions disctinctes pour gerer les deux forms séparements sinon a la validation d'un des deux formulaire, le formulaire vide génèrerais une erreur de champs vides.
//   const handleSignUpChange = (event) => {
//     const { name, value } = event.target;
//     setSignUpData({ ...signUpData, [name]: value });
//   };

//   // On utilise deux fonctions disctinctes pour gerer les deux forms séparements sinon a la validation d'un des deux formulaire, le formulaire vide génèrerais une erreur de champs vides.
//   const handleLoginChange = (event) => {
//     const { name, value } = event.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   // On utilise cette fonction en front pour faire une prévérification afin d'éviter de surcharger le serveur en demandes de connexions alors qu'il y a des erreurs.
//   const validatePassword = (password) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   // Fonction de soumission du formulaire d'inscription
//   const handleSignUpSubmit = async (event) => {
//     event.preventDefault();

//     // Vérification si les passwords correspondent:
//     if (signUpData.password !== signUpData.confirmPassword) {
//       alert("Les mots de passe ne correspondent pas");
//       return;
//     }

//     // Vérification que le mot de passe respecte nos conditions:
//     if (!validatePassword(signUpData.password)) {
//       alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
//       return;
//     }

//     try {
//       // Envoi de la requête POST au serveur pour l'inscription:
//       const response = await fetch('http://localhost:3000/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(signUpData),
//       });

//       // Récupération de la réponse du serveur
//       const data = await response.json();

//       if (response.ok) {
//         alert('Inscription réussie, félicitation !');

//         // Réinitialisation les champs du formulaire d'inscription:
//         setSignUpData({
//           firstname: '',
//           lastname: '',
//           address: '',
//           phone: '',
//           email: '',
//           password: '',
//           confirmPassword: ''
//         });

//         // Réinitialise le message d'erreur:
//         setErrorMessage('');

//         // Redirige vers l'accueil après que l'inscription ait réussie.
//         window.location.href = '/';
//       } else {
//         setErrorMessage(data.message || 'Erreur lors de l\'inscription');
//       }
//     } catch (error) {
//       console.error('Erreur lors de l\'inscription:', error);
//       setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer plus tard.');
//     }
//   };

//   // On utilise deux fonctions disctinctes pour gerer les deux forms séparements sinon a la validation d'un des deux formulaire, le formulaire vide génèrerais une erreur de champs vides.
//   const handleLoginSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // Envoi de la requête POST au serveur pour la connexion
//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(loginData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log('Connexion réussie:', data);

//         // Stocker le token JWT dans le localStorage si nécessaire
//         localStorage.setItem('token', data.token);

//         // Réinitialisation des champs du formulaire de connexion
//         setLoginData({
//           email: '',
//           password: ''
//         });

//         // Afficher un message d'alerte
//         alert('Bravo, vous êtes connecté !');

//         // Rediriger vers la page d'accueil après connexion réussie
//         window.location.href = '/'; // ou toute autre URL souhaitée
//       } else {
//         setErrorMessage(data.message || 'Erreur lors de la connexion');
//       }
//     } catch (error) {
//       console.error('Erreur lors de la connexion:', error);
//       setErrorMessage('Erreur lors de la connexion. Veuillez réessayer plus tard.');
//     }
//   };


//   return (
//     <>

//       <div>
//         {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

//         {!isLogin && (
//           <form onSubmit={handleSignUpSubmit}>
//             <input
//               type="text"
//               name="firstname"
//               placeholder="Prénom"
//               value={signUpData.firstname}
//               onChange={handleSignUpChange}
//               required
//             />
//             <input
//               type="text"
//               name="lastname"
//               placeholder="Nom"
//               value={signUpData.lastname}
//               onChange={handleSignUpChange}
//               required
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Adresse"
//               value={signUpData.address}
//               onChange={handleSignUpChange}
//               required
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Téléphone"
//               value={signUpData.phone}
//               onChange={handleSignUpChange}
//               pattern="[0-9]{10}"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={signUpData.email}
//               onChange={handleSignUpChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Mot de passe"
//               value={signUpData.password}
//               onChange={handleSignUpChange}
//               required
//             />
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirmez le mot de passe"
//               value={signUpData.confirmPassword}
//               onChange={handleSignUpChange}
//               required
//             />
//             <button type="submit">S'inscrire</button>
//           </form>
//         )}

//         {isLogin && (
//           <form onSubmit={handleLoginSubmit}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={loginData.email}
//               onChange={handleLoginChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Mot de passe"
//               value={loginData.password}
//               onChange={handleLoginChange}
//               required
//             />
//             <button type="submit">Se connecter</button>
//           </form>
//         )}
//         <button onClick={() => setIsLogin(true)}>Acceder à la partie connexion</button>
//         <button onClick={() => setIsLogin(false)}>Acceder à la partie inscription</button>
//       </div>
//     </>
//   );
// };

// export default SignUp;

// import React from "react";
// import AxiosCall from "../services/axiosCall";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { accountService } from "../services/account.service";

// const Login = () => {

//   // Cet useState permet de stocker les valeurs des champs du form de connexion:
//   const [loginConnexion, setLoginConnexion] = useState({
//     email: 'decp@decp.fr', // Mis les valeurs de bases correctes pour me connecter sans les saisirs à chaque fois.
//     password: 'Test2024!' // Mis les valeurs de bases correctes pour me connecter sans les saisirs à chaque fois.
//   })

//   // Cette fonction est appelée chaque fois que l'utilisateur modifie la valeur d'un champ de saisie:
//   const inputsChange = (e) => {
//     // Ces deux console.log permettent de voir le nom du champ et la valeur de son champs lorsqu'il est modifié:
//     console.log(e.target.name)
//     console.log(e.target.value)
//     // Mettre dans la parenthèse de setLoginConnexion le code suivant permet de l'enregistrer.
//     setLoginConnexion({
//       ...loginConnexion, // Prend les valeurs actuelles du useState
//       [e.target.name]: e.target.value // Permet grâce à l'évènement (e) de récuperer le nom du champ et sa nouvelle valeur.
//     })
//   }

//   // Cet useState permet de stocker le message d'erreur placé en bas du form de connexion.
//   const [errorMessage, setErrorMessage] = useState('');

//   // Initialise la redirection:
//   const navigate = useNavigate();

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     console.log(loginConnexion)
//     accountService.login(loginConnexion)
//     try {
//       const response = await AxiosCall.post('/login', loginConnexion)
//       console.log(response)
//       // On place le token en vérifiant bien le chemin d'accés a celui-çi dans le console.log de response précédent:
//       accountService.saveToken(response.data.token)
//       // Petit message de succes quand on arrive à se connecter:
//       alert('connexion réussie, vous nous avez manqué !');
//       // On redirige l'utilisateur vers l'accueil une fois la connexion réussie:
//       navigate('/')
//     } catch (error) {
//       console.log(error)
//       // Message d'erreur:
//       setErrorMessage('Email ou mot de passe incorrect. Veuillez réessayer.');
//     }
//   }

//   return (

//     <div>
//       <form onSubmit={/*handleLoginSubmit*/onSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={/*loginData.email*/loginConnexion.email}
//           onChange={/*handleLoginChange*/inputsChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Mot de passe"
//           value={/*loginData.password*/loginConnexion.password}
//           onChange={/*handleLoginChange*/inputsChange}
//           required
//         />
//         <button type="submit">Se connecter</button>
//       </form>
//       {/*Le premier errorMessage est une condition qui dit que si il y a une erreur on affiche le message a droite du &&*/}
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import AxiosCall from "../services/axiosCall";
import { useNavigate } from "react-router-dom";
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
    confirmPassword: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpData({ ...signUpData, [name]: value });
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
          confirmPassword: ''
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
          <button type="submit">S'inscrire</button>
        </form>
      )}

      <button onClick={() => setIsLogin(true)}>Connexion</button>
      <button onClick={() => setIsLogin(false)}>Inscription</button>
    </div>
  );
};

export default AuthenticationPage;
