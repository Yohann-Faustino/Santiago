// Ce service expose des méthodes pour récupérer/ajouter des commentaires depuis le backend.

import Comments from "../models/comments.js";
import { Op } from "sequelize";

const commentController = {
    // Méthode pour ajouter un commentaire:
    addComment: async (req, res) => {
        // On récupère les données du commentaire depuis le token d’authentification.
        console.log("Utilisateur connecté :", req.user);
        const { title, content } = req.body;
        const users_id = req.user.id;

        try {
            // On calcule la date limite entre deux posts de commentaires (ici 24h):
            const dateLimite = new Date(new Date() - 24 * 60 * 60 * 1000);

            // On vérifie si l'utilisateur a déjà posté un commentaire dans les dernières 24h:
            const lastComment = await Comments.findOne({
                where: {
                    users_id: users_id, // On recherche par ID d'utilisateur.
                    created: { [Op.gte]: dateLimite } // Et on filtre par date de création après la date limite.
                }
            });

            // Si un commentaire est trouvé qui a été posté dans les dernières 24h, on renvoie un message d'erreur:
            if (lastComment) {
                return res.status(400).json({ message: 'Vous ne pouvez ajouter qu\'un commentaire toutes les 24 heures.' });
            }

            // Si aucun commentaire n'a été trouvé dans les dernières 24h, on peut ajouter celui-ci:
            const newComment = await Comments.create({
                title,
                content,
                users_id
            });

            // On renvoie un message de succès avec les détails du nouveau commentaire:
            res.status(201).json({ message: 'Commentaire ajouté avec succès !', comment: newComment });

        } catch (err) {
            console.error('Erreur lors de l\'ajout du commentaire.', err);
            // En cas d'erreur, on renvoie un message d'erreur général:
            res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire.' });
        }
    },

    // Méthode pour récupérer tous les commentaires:
    getAllComments: async (req, res) => {
        try {
            const comments = await Comments.findAll(); // On récupère tous les commentaires de la base de données.
            res.status(200).json(comments); // On renvoie la liste des commentaires avec un statut 200 (succès).
        } catch (err) {
            console.error('Erreur lors de la récupération des commentaires.', err);
            // En cas d'erreur, on renvoie un message d'erreur général:
            res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
        }
    },

    // Fonction pour mettre à jour un commentaire par ID
    updateComment: async (req, res) => {
        try {
            const [updated] = await Comments.update(req.body, { where: { id: req.params.id } });

            if (updated) {
                const updatedComment = await Comments.findOne({ where: { id: req.params.id } });
                return res.status(200).json(updatedComment);
            }

            res.status(404).json({ message: 'Commentaire non trouvé.' });
        } catch (err) {
            console.error('Erreur lors de la mise à jour du commentaire :', err);
            res.status(500).json({ message: 'Erreur interne du serveur lors de la mise à jour du commentaire.' });
        }
    },

    // Méthode pour supprimer un commentaire par ID
    deleteComment: async (req, res) => {
        try {
            const { id } = req.params; // Récupère l'ID du commentaire dans l'URL
            const comment = await Comments.findByPk(id); // Cherche le commentaire en base de données

            if (!comment) {
                return res.status(404).json({ message: 'Commentaire non trouvé' });
            }

            // Si le commentaire est trouvé, on le supprime
            await comment.destroy();
            return res.status(200).json({ message: 'Commentaire supprimé' });
        } catch (err) {
            console.error('Erreur lors de la suppression du commentaire.', err);
            // En cas d'erreur, on renvoie un message d'erreur général:
            res.status(500).json({ message: 'Erreur lors de la suppression du commentaire.' });
        }
    }
};

export default commentController;
