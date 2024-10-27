// on utilise un hook: useParams est un paramètre de route utilisé pour récupérer une valeur dynamique de l'URL.
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { commentService } from "../../../src/services/comment.service";

const CommentsEdit = () => {

    const [comment, setComment] = useState([])
    const flag = useRef(false)

    // Récupération de l'Id de l'user:
    const { cid } = useParams()
    console.log(cid)

    // Handle de modifications dans le form:
    const onChange = (e) => {

    }

    // Soumission du form:
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(comment)
    }

    useEffect(() => {
        // On utilise flag.current pour éviter de rappeler userService.getAllUsers() plus d'une fois lors du rendu du composant:
        if (flag.current === false) {
            commentService.getComment(cid)
                .then(res => {
                    console.log(res.data)
                    setComment(res.data)
                })
                .catch(err => console.log(err))
        }
        return () => flag.current = true
    }, [])

    return (
        <div className="commentsEdit p-4">
            <h1 className=" mb-3">CommentsEdit</h1>
            <form onSubmit={onSubmit}>
                <div className=" flex flex-col mb-3">
                    <label htmlFor="idComment">Modifier l'Id</label>
                    <input className="modifiable" type="text" name="idComment" value={comment.id} onChange={onChange} />
                </div>
                <div className=" flex flex-col mb-3">
                    <label htmlFor="title">Modifier le Titre</label>
                    <input className="modifiable" type="text" name="title" value={comment.title} onChange={onChange} />
                </div>
                <div className=" flex flex-col mb-3">
                    <label htmlFor="content">Modifier le Commentaire</label>
                    <input className="modifiable" type="text" name="content" value={comment.content} onChange={onChange} />
                </div>
                <div className=" flex flex-col mb-3">
                    <button>Enregistrer les modifications</button>
                </div>
            </form>
        </div>
    );
};

export default CommentsEdit;