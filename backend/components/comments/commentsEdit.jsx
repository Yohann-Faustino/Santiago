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
        <div className="commentsEdit">
            <h1>CommentsEdit</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="idComment">Modifier l'Id</label>
                    <input type="text" name="idComment" value={comment.id} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="title">Modifier le Titre</label>
                    <input type="text" name="title" value={comment.title} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="content">Modifier le Commentaire</label>
                    <input type="text" name="content" value={comment.content} onChange={onChange} />
                </div>
                <div>
                    <button>Enregistrer les modifications</button>
                </div>
            </form>
        </div>
    );
};

export default CommentsEdit;