import AxiosCall from "./axiosCall.js";
import { accountService } from "./account.service.js";

let getAllComments = () => {
    const token = accountService.getToken();
    return AxiosCall.get('/comments', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

let getComment = (cid) => {
    const token = accountService.getToken();
    return AxiosCall.get('/comments/' + cid, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

let addComment = (commentData) => {
    const token = accountService.getToken();
    return AxiosCall.post('/comments', commentData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const commentService = {
    getAllComments, getComment, addComment
};
