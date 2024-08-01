// Ce service expose des méthodes pour gérer l'authentification de l'utilisateur via des appels HTTP et le stockage du token JWT dans le localStorage du navigateur.  

import AxiosCall from "./axiosCall"

let login = (loginConnexion) => {
    return AxiosCall.post('auth/login', loginConnexion);
}

// On stock le token dans le localStorage (zone de stockage du navigateur qui se rappel du token même si tu coupes le navigateur).
let saveToken = (token) => {
    localStorage.setItem('token', token);
    console.log('Token sauvegardé dans le localStorage:', token);
}

// On retire le token de la session:
let logout = () => {
    localStorage.removeItem('token');
    console.log('Token retiré du localStorage.');
}

// On vérifie la présence du token pour savoir si l'utilisateur est identifié:
let isLogged = () => {
    const logged = !!localStorage.token;
    console.log('Utilisateur connecté:', logged);
    return logged;
}

// On récupère le token dans le stockage du navigateur:
let getToken = () => {
    const token = localStorage.token;
    console.log('Token récupéré du localStorage:', token);
    return token;
}

export const accountService = {
    login, saveToken, isLogged, logout, getToken
};
