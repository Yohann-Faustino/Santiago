// Ce service expose une méthodes pour récupérer le profil de l'utilisateur depuis le backend. 

import AxiosCall from './axiosCall';

let getProfile = () => {
    return AxiosCall.get('/profile');
};

export default getProfile;