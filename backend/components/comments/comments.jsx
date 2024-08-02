// Permet de naviguer vers une autre page (commentsEdit) tout en passant un paramètre d'ID utilisateur:
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { commentService } from "../../../src/services/comment.service";
import { Link } from "react-router-dom";



const Comments = () => {

    let navigate = useNavigate()

    const marcel = (userId) => {
        console.log('boom Comments')
        navigate("../commentsedit/"+userId)
    }
    
    //
    const [comments, setComments] = useState([])

    // let { cid } = useParams()
    // console.log(cid)
    
        // Ce hook sert de pense bête pour que mon code se rappel d'une fonction décrite plus bas.
        const flag = useRef(false)

    // Ce hook s'active en même temps qu'un événement particulier choisis par le dev et si il y a pas d'événement particulier on met un tableau vide pour qu'il s'execute qu'une seule fois.
    // useEffect permet de charger progressivement les donées car il demande a charger les données de la bdd apres que la page soit chargée.
    // On ajoute une fonction qui fait une requête HTTP pour récupérer les données des utilisateurs depuis la bdd.
    useEffect(() => {

        // On utilise flag.current pour éviter de rappeler userService.getAllUsers() plus d'une fois lors du rendu du composant:
        if (flag.current === false) {
            commentService.getAllComments()
                .then(res => {
                    console.log(res.data)
                    setComments(res.data)
                })
                .catch(err => console.log(err))
        }
        return () => flag.current = true
    }, [])

    return (
        <div className="comments">
            <h1>Comments</h1> <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Titre</th>
                        <th>Contenue</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // On utilise map pour parcourir le tableau des données des users et on utilise les props pour l'organiser.
                        comments.map(comment => (
                            // Key explique a réact qu'il sagit de la donnée importante et unique qui identifie les users:
                            <tr key={comment}> {}
                                <td><Link to={`/admin/comments/commentsedit/${comment.id}`}>{comment.id}</Link></td>
                                <td><Link to={`/admin/comments/commentsedit/${comment.title}`}>{comment.title}</Link></td>
                                <td><Link to={`/admin/comments/commentsedit/${comment.content}`}>{comment.content}</Link></td>
                                {/* <td>{comment.title}</td> */}
                                {/* <td>{comment.content}</td> */}

                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button onClick={() => marcel(69)}>Comments 69</button>
        </div>
    );
};

export default Comments ;