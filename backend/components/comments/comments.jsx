import React, { useRef, useState, useEffect } from "react";
import { commentService } from "../../../src/services/comment.service";
import { Link } from "react-router-dom";
import SideMenu from "../admin/sideMenu";

const Comments = () => {

    // Ce hook prépare une place pour stocker les données des commentaires une fois qu'elles seront récupérées.
    const [comments, setComments] = useState([]);

    // useState pour gérer l'état de chargement lors des appels API (chargement en cours...):
    const [loading, setLoading] = useState(true);

    // Ce hook pour affiche les messages utilisateur.
    const [message, setMessage] = useState('');

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
                    setComments(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    setMessage("❌ Impossible de charger les commentaires.");
                    setTimeout(() => setMessage(''), 3000);
                    setLoading(false);
                });
        }
        return () => flag.current = true;
    }, []);

    const delComment = (commentId) => {
        const confirmDelete = window.confirm("Es-tu sûr de vouloir supprimer ce commentaire ?");
        if (!confirmDelete) return;

        commentService.deleteComment(commentId)
            .then(() => {
                setComments((current) => current.filter(comment => comment.id !== commentId));
                setMessage("✅ Commentaire supprimé avec succès.");
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(() => {
                setMessage("❌ Échec de la suppression du commentaire.");
                setTimeout(() => setMessage(''), 3000);
            });
    }

    return (
        <div className="comments flex-col p-4">
            <h1 className="mb-4">Liste des commentaires:</h1>
            {message && <div role="alert" aria-live="assertive">{message}</div>}
            {loading ? (
                <p>Chargement des commentaires...</p>
            ) : (
                <div className="commentsSideMenu justify-around">
                    <div>
                        <SideMenu />
                    </div>
                    <div className=" commentsBoard">
                        <table className="border-collapse border border-gray-300 w-full">
                            <thead>
                                <tr className="bg-red-500">
                                    <th scope="col" className="p-2 text-center border border-gray-300">🚮</th>
                                    <th scope="col" className="p-2 text-center border border-gray-300">#</th>
                                    <th scope="col" className="p-2 text-center border border-gray-300">Titre</th>
                                    <th scope="col" className="p-2 text-center border border-gray-300">Contenu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // On utilise map pour parcourir le tableau des données des commentaires et on utilise les props pour les organiser.
                                    comments.map(comment => (
                                        // Key explique à React qu'il s'agit de la donnée importante et unique qui identifie les commentaires:
                                        <tr key={comment.id} className="hover:bg-gray-100">
                                            <td
                                                className="text-center border border-gray-300 cursor-pointer hover:bg-red-100"
                                                onClick={() => delComment(comment.id)}
                                                title="Supprimer le commentaire" // Permet d'afficher une infobulle pour expliquer qu'il sagit de supprimer le commentaire
                                                aria-label={`Supprimer le commentaire ${comment.title}`}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => { if (e.key === "Enter") delComment(comment.id); }}
                                            >
                                                🗑️
                                            </td>
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
                </div>
            )}
        </div>
    );
};

export default Comments;
