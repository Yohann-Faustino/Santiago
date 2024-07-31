// Ce service expose des méthodes pour récupérer des utilisateurs depuis le backend. 

import AxiosCall from "./axiosCall"; // Importe l' instance de axios que j'ai configuré dans axiosCall.js

// Méthode qui récupère la liste des users:
let getAllUsers = () => {
    return AxiosCall.get('/users')
}

// Méthode qui récupère l'id d'un user:
let getUser = (uid) => {
    return AxiosCall.get('/users/'+uid)
}

// On exporte les méthodes pour pouvoir s'en servir ailleur:
export const userService = {
    getAllUsers, getUser
}