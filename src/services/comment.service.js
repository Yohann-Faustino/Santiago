// Ce service expose des méthodes pour récupérer des commentaires depuis le backend. 

import AxiosCall from "./axiosCall.js";
import AxiosPublic from "./axiosPublic.js";
import { accountService } from "./account.service.js";

// Méthode qui récupère la liste des commentaires:
// On met pas de token pour que tous le monde puisse voir les com sinons ils sont innacessible dans sliderCom.
let getAllComments = () => {
    return AxiosPublic.get('/comments');
}

// Méthode qui récupère un commentaire selon son ID:
let getComment = (cid) => { // cid (comments id) définis dans commentsEdit.jsx
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

// Méthode qui met à jour un commentaire:
let updatedComment = (comment) => { 
    const token = accountService.getToken();
    
    return AxiosCall.patch('/comments/' + comment.id, comment, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Méthode qui supprime un commentaire:
let deleteComment = (cid) => {
    const token = accountService.getToken();
    
    return AxiosCall.delete('/comments/' + cid, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// On exporte les méthodes pour pouvoir s'en servir ailleur:
export const commentService = {
    getAllComments, getComment, addComment, updatedComment, deleteComment
};
