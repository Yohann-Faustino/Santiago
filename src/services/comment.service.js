// Ce service expose des méthodes pour récupérer des commentaires depuis le backend. 

import AxiosCall from "./axiosCall.js";
import AxiosPublic from "./axiosPublic.js";
import { accountService } from "./account.service.js";

// Méthode qui récupère la liste des commentaires:
// On retire le token pour que tous le monde puisse voir les com sinons ils sont innacessible dans sliderCom.
let getAllComments = () => {
    // const token = accountService.getToken();
    return AxiosPublic.get('/comments'/*, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }*/);
}

// Méthode qui récupère un commentaire selon son ID:
let getComment = (cid) => {
    const token = accountService.getToken();
    return AxiosCall.get('/comments/' + cid, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

// Méthode qui ajoute un commentaire:
let addComment = (commentData) => {
    const token = accountService.getToken();
    return AxiosCall.post('/comments', commentData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

// On exporte les méthodes pour pouvoir s'en servir ailleur:
export const commentService = {
    getAllComments, getComment, addComment
};
