import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { commentService } from "../../../src/services/comment.service";
import { Link } from "react-router-dom";

const Comments = () => {

    let navigate = useNavigate();

    // Permet de naviguer vers une autre page (commentsEdit) tout en passant un paramètre d'ID commentaire:
    const marcel = (commentId) => {
        console.log('boom Comments');
        navigate("../commentsedit/" + commentId);
    };

    // Ce hook prépare une place pour stocker les données des commentaires une fois qu'elles seront récupérées.
    const [comments, setComments] = useState([]);

    // Ce hook sert de pense-bête pour que mon code se rappelle d'une fonction décrite plus bas.
    const flag = useRef(false);

    // Ce hook s'active en même temps qu'un événement particulier choisi par le dev et si il n'y a pas d'événement particulier on met un tableau vide pour qu'il s'exécute qu'une seule fois.
    // useEffect permet de charger progressivement les données car il demande à charger les données de la bdd après que la page soit chargée.
    // On ajoute une fonction qui fait une requête HTTP pour récupérer les données des commentaires depuis la bdd.
    useEffect(() => {

        // On utilise flag.current pour éviter de rappeler commentService.getAllComments() plus d'une fois lors du rendu du composant:
        if (flag.current === false) {
            commentService.getAllComments()
                .then(res => {
                    console.log(res.data);
                    setComments(res.data);
                })
                .catch(err => console.log(err));
        }
        return () => flag.current = true;
    }, []);

    return (
        <div className="comments flex flex-col p-4">
            <h1 className="mb-4">Comments</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-red-500">
                        <th className="p-2 text-center border border-gray-300">#</th>
                        <th className="p-2 text-center border border-gray-300">Titre</th>
                        <th className="p-2 text-center border border-gray-300">Contenu</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // On utilise map pour parcourir le tableau des données des commentaires et on utilise les props pour les organiser.
                        comments.map(comment => (
                            // Key explique à React qu'il s'agit de la donnée importante et unique qui identifie les commentaires:
                            <tr key={comment.id} className="hover:bg-gray-100">
                                <td className="p-2 text-center border border-gray-300">
                                    <Link to={`/admin/comments/commentsedit/${comment.id}`}>{comment.id}</Link>
                                </td>
                                <td className="p-2 text-center border border-gray-300">
                                    <Link to={`/admin/comments/commentsedit/${comment.id}`}>{comment.title}</Link>
                                </td>
                                <td className="p-2 text-center border border-gray-300">
                                    <Link to={`/admin/comments/commentsedit/${comment.id}`}>{comment.content}</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Comments;
