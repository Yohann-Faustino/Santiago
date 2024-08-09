// Ce service expose une méthodes pour récupérer/modifier le profil de l'utilisateur depuis le backend. 

import AxiosCall from './axiosCall';

let getProfile = () => {
    return AxiosCall.get('/profile');
};

let updateProfile = (profileData) => {
    return AxiosCall.put('/profile/update', profileData);  // Requête PUT pour mettre à jour le profil.
};

export { getProfile, updateProfile};