// Ce service expose des méthodes pour récupérer des commentaires depuis le backend. 

import AxiosCall from "./axiosCall.js";
import { accountService } from "./account.service.js";

// Méthode qui récupère la liste des commentaires:
let getAllComments = () => {
    const token = accountService.getToken();
    return AxiosCall.get('/comments', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
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
