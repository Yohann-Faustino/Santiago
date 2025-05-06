import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { commentService } from "../../../src/services/comment.service";

const CommentsEdit = () => {
    // État local pour stocker les données du commentaire
    const [comment, setComment] = useState({
        title: '',
        content: '',
        users_id: ''
    });
    // Référence pour contrôler si le composant a été monté
    const flag = useRef(false);
    // Récupération de l'ID du commentaire depuis les paramètres d'URL

    const [message, setMessage] = useState(''); // Gere le message de prise en compte de la modification sur l'user.

    const { cid } = useParams();
    console.log("ID du commentaire récupéré :", cid);

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

        console.log(commentData); // Affiche les données envoyées pour vérification

        try {
            // Appelle le service pour mettre à jour le commentaire
            const res = await commentService.updatedComment(commentData);
            console.log(res); // Affiche la réponse de l'API en cas de succès

            // Affiche un message de confirmation
            setMessage('✅ Commentaire mis à jour avec succès.');

            // Efface le message après 3 secondes
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.log(err); // Affiche une erreur en cas d'échec de la mise à jour

            // Affiche un message d'erreur
            setMessage('❌ Une erreur est survenue lors de la mise à jour.');
        }
    };

    // Effet secondaire pour récupérer les données du commentaire à éditer
    useEffect(() => {
        if (flag.current === false) {
            // Récupère les données du commentaire en utilisant l'ID
            commentService.getComment(cid)
                .then((res) => {
                    console.log("Données du commentaire récupérées :", res.data);
                    // Met à jour l'état avec les données récupérées
                    setComment(res.data);
                })
                .catch((err) => console.error("Erreur lors de la récupération du commentaire :", err));
        }
        // Change le flag pour éviter de récupérer les données plusieurs fois
        return () => { flag.current = true; };
    }, [cid]); // Exécute l'effet uniquement lorsque cid change

    return (
        <div className="commentsEdit p-4">
            <h1 className="mb-3">Modifier le Commentaire</h1>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col mb-3">
                    <label htmlFor="title">Titre</label>
                    <input
                        className="modifiable"
                        type="text"
                        name="title"
                        value={comment.title || ''} // Affiche le titre actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="content">Contenu</label>
                    <textarea
                        className="modifiable"
                        name="content"
                        value={comment.content || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div>
                    {/* Affiche un message de succès ou d'erreur */}
                    {message && (
                        <p className="text-green-600 font-semibold mb-4">{message}</p>
                    )}
                </div>
                <button className="mt-4 p-2 bg-blue-900 text-white rounded">Enregistrer</button>
            </form>
        </div>
    );
};

export default CommentsEdit;
