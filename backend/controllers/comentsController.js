import Comments from "../models/comments.js";

const commentController = {
    // Fonction pour ajouter un commentaire:
    addComment: async (req, res) => {
        const { title, content } = req.body;

        console.log('Données du commentaire reçues', req.body);

        try {
            // Créer un nouveau commentaire:
            const newComment = await Comments.create({
                title,
                content,
                // Ajouter d'autres champs si nécessaire
            });

            res.status(201).json({ message: 'Commentaire ajouté avec succès !', comment: newComment });

        } catch (err) {
            console.error('Erreur lors de l\'ajout du commentaire.', err);
            res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire.' });
        }
    }
};

export default commentController;
