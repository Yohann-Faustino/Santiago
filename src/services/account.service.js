
import AxiosCall from "./axiosCall"

// On cré la route de connexion avec AxiosCall:
let login = (loginConnexion) => {
    return AxiosCall.post('auth/login', loginConnexion)
}

// On stock le stock dans le localStorage (zone de stockage du navigateur qui se rappel du token meme si tu coupe le navigateur).
let saveToken = (token) => {
    localStorage.setItem('token', token)
}

// On retire le token de la session:
let logout = () => {
    localStorage.removeItem('token')
}

// On vérifie la présence du token pour savoir si l'utilisateur est identifié:
let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

// On récupère le token dans le stockage du navigateur:
let getToken = () => {
    return localStorage.getItem('token')
}

export const accountService = {
    login, saveToken, isLogged, logout, getToken
}