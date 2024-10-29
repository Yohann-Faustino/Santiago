// Ce service expose des méthodes pour récupérer des utilisateurs depuis le backend. 

import AxiosCall from "./axiosCall"; // Importe l' instance de axios que j'ai configuré dans axiosCall.js

// Méthode qui récupère la liste des users:
let getAllUsers = () => {
    return AxiosCall.get('/users')
}

// Méthode qui récupère l'id d'un user:
let getUser = (uid) => { // uid (users id) définis dans userEdit.jsx
    return AxiosCall.get('/users/'+uid)
}

// Méthode qui modifie les données d'un user:
let getUpdate = (user) => { 
    return AxiosCall.patch('/users/' + user.id, user)
}

// On exporte les méthodes pour pouvoir s'en servir ailleur:
export const userService = {
    getAllUsers, getUser, getUpdate
}