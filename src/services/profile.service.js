// Ce service expose une méthode pour récupérer/modifier le profil de l'utilisateur depuis le backend. 

import AxiosCall from './axiosCall';

// Fonction pour récupérer le profil utilisateur:
let getProfile = () => {
    return AxiosCall.get('/profile');
};

// Fonction pour mettre à jour le profil de l'utilisateur:
let updateProfile = (profileData) => {
    return AxiosCall.put('/profile/update', profileData);  // Requête PUT pour mettre à jour les données du profil.
};

// Fonction pour mettre à jour le mot de passe utilisateur:
export const updatePassword = async (passwordData) => {
    return await AxiosCall.put('/profile/password', passwordData);
};
export { getProfile, updateProfile};