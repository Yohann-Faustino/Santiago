import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { commentService } from "../../../src/services/comment.service";
import SideMenu from "../admin/sideMenu";

const CommentsEdit = () => {
    // État local pour stocker les données du commentaire
    const [comment, setComment] = useState({
        title: '',
        content: '',
        users_id: ''
    });

    // useState pour gérer l'état de chargement lors des appels API (chargement en cours...):
    const [loading, setLoading] = useState(false);

    // Référence pour contrôler si le composant a été monté
    const flag = useRef(false);
    // Récupération de l'ID du commentaire depuis les paramètres d'URL

    const [message, setMessage] = useState(''); // Gere le message de prise en compte de la modification sur l'user.

    const { cid } = useParams();

    // Fonction de gestion du changement d'input
    const onChange = (e) => {
        const { name, value } = e.target;
        // Met à jour l'état du commentaire avec la nouvelle valeur
        setComment((prevComment) => ({
            ...prevComment,
            [name]: value
        }));
    };

    // Fonction de soumission du formulaire
    const onSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Prépare les données du commentaire à envoyer
        const commentData = {
            title: comment.title,
            content: comment.content,
            users_id: comment.users_id,
            id: cid // Inclut l'ID du commentaire pour la mise à jour
        };

        try {
            setLoading(true);
            // Appelle le service pour mettre à jour le commentaire
            await commentService.updatedComment(commentData);
            setMessage('✅ Commentaire mis à jour avec succès.');
            setTimeout(() => setMessage(''), 3000);
        } catch {
            setMessage('❌ Une erreur est survenue lors de la mise à jour.');
            setTimeout(() => setMessage(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    // Effet secondaire pour récupérer les données du commentaire à éditer
    useEffect(() => {
        if (flag.current === false) {
            // Récupère les données du commentaire en utilisant l'ID
            commentService.getComment(cid)
                .then((res) => {
                    setComment(res.data);
                })
                .catch(() => {
                    setMessage('❌ Impossible de charger le commentaire.');
                    setTimeout(() => setMessage(''), 3000);
                });
        }
        // Change le flag pour éviter de récupérer les données plusieurs fois
        return () => { flag.current = true; };
    }, [cid]); // Exécute l'effet uniquement lorsque cid change

    return (
        <div className="commentsEdit p-4">
            <h1 className="mb-3">Modifier le Commentaire:</h1>
            <div className=" mb-5">
                <SideMenu />
            </div>
            <form onSubmit={onSubmit} className=" flex flex-col text-center">
                <div className="flex flex-col mb-3">
                    <label htmlFor="editCommenttitle">Titre</label>
                    <input
                        className="modifiable text-center"
                        id="editCommenttitle"
                        type="text"
                        name="title"
                        value={comment.title || ''} // Affiche le titre actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="editCommentContent">Contenu</label>
                    <textarea
                        className="modifiable text-center"
                        id="editCommentContent"
                        name="content"
                        value={comment.content || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div>
                    {/* Affiche un message de succès ou d'erreur */}
                    {message && (
                        <p
                            role="alert"
                            aria-live="assertive"
                            className={`font-semibold mb-4 ${message.startsWith('❌') ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </p>
                    )}
                </div>
                <div>
                    <button
                        className=" p-2 bg-blue-900 text-white rounded"
                        disabled={loading}
                    >
                        {loading ? "Enregistrement en cours..." : "Enregistrer"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentsEdit;
