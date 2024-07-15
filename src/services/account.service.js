
import AxiosCall from "./axiosCall"

// // On cré la route de connexion avec AxiosCall:
// let login = (loginConnexion) => {
//     return AxiosCall.post('auth/login', loginConnexion);
// }

// // On stock le stock dans le localStorage (zone de stockage du navigateur qui se rappel du token meme si tu coupe le navigateur).
// let saveToken = (token) => {
//     localStorage.setItem('token', token);
// }

// // On retire le token de la session:
// let logout = () => {
//     localStorage.removeItem('token');
// }

// // On vérifie la présence du token pour savoir si l'utilisateur est identifié:
// let isLogged = () => {
//     const token = localStorage.getItem('token');
//     return !!token;
// }

// // On récupère le token dans le stockage du navigateur:
// let getToken = () => {
//     return localStorage.getItem('token');
// }

// export const accountService = {
//     login, saveToken, isLogged, logout, getToken
// };
// account.service.js

// account.service.js

// On cré la route de connexion avec AxiosCall:
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
