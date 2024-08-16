import AxiosCall from "./axiosCall";
import { jwtDecode } from "jwt-decode";

// Fonction envoie une requête POST à l'API d'authentification avec les données de connexion fournies:
let login = (loginConnexion) => {
    return AxiosCall.post('auth/login', loginConnexion);
}

// Sauvegarde le token JWT dans le localStorage:
let saveToken = (token) => {
    localStorage.setItem('token', token);
    console.log('Token sauvegardé dans le localStorage:', token);
}

// Déconnecte l'utilisateur en retirant le token du localStorage:
let logout = () => {
    localStorage.removeItem('token');
    console.log('Token retiré du localStorage.');
}

// Vérifie si l'utilisateur est connecté en testant la présence du token:
let isLogged = () => {
    const logged = !!localStorage.getItem('token'); // Utilise getItem pour accéder au token.
    console.log('Utilisateur connecté:', logged);
    return logged;
}

// Vérifie le role de l'user:
let getRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log('Contenu du token décodé:', decodedToken);
            return decodedToken.role;
        } catch (error) {
            console.error('Erreur lors du décodage du token:', error);
            return null;
        }
    }
    return null;
}

// Récupère le token du localStorage:
let getToken = () => {
    const token = localStorage.getItem('token'); // Utilise getItem pour accéder au token.
    console.log('Token récupéré du localStorage:', token);
    return token;
}

// Décode le token JWT pour obtenir l'id de l'utilisateur afin de pouvoir ensuite limiter le post de com par une limite de temps:
let getCurrentUserId = () => {
    const token = getToken();
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.id; // On renvoie l'id de l'user pour l'utiliser ultérieurement.
        } catch (error) {
            console.error('Erreur lors du décodage du token:', error);
            return null;
        }
    }
    return null;
}

export const accountService = {
    login,
    saveToken,
    isLogged,
    getRole,
    logout,
    getToken,
    getCurrentUserId
};
