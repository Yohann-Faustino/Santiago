// controllers/commentController.js

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
            });

            res.status(201).json({ message: 'Commentaire ajouté avec succès !', comment: newComment });

        } catch (err) {
            console.error('Erreur lors de l\'ajout du commentaire.', err);
            res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire.' });
        }
    },

    // Fonction pour récupérer tous les commentaires:
    getAllComments: async (req, res) => {
        try {
            const comments = await Comments.findAll();
            res.status(200).json(comments);
        } catch (err) {
            console.error('Erreur lors de la récupération des commentaires.', err);
            res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
        }
    }
};

export default commentController;
