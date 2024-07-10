// Permet de naviguer vers une autre page (commentsEdit) tout en passant un paramètre d'ID utilisateur:
import React from "react";
import { useNavigate } from "react-router-dom";


const Comments = () => {

    let navigate = useNavigate()

    const commentSelectId = (commentId) => {
        console.log('click')
        navigate("../commentsedit/"+commentId)

    }
    return (
        <div className="comments">
            <h1>Comments</h1>
            <button onClick={() => commentSelectId(2)}>Commentaire 2</button>
        </div>
    );
};

export default Comments ;