// Ce service expose des méthodes pour récupérer/ajouter des commentaires depuis le backend.

import Comments from "../models/comments.js";
import { Op } from "sequelize";

const commentController = {
    // Méthode pour ajouter un commentaire:
    addComment: async (req, res) => {
        // On récupère les données du commentaire depuis le token d’authentification.
        console.log("[ADD COMMENT] Utilisateur connecté :", req.user);
        const { title, content } = req.body;
        const users_id = req.userId;

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
                console.warn(`[ADD COMMENT] L'utilisateur ${users_id} a déjà posté un commentaire dans les 24h.`);
                return res.status(400).json({ message: 'Vous ne pouvez ajouter qu\'un commentaire toutes les 24 heures.' });
            }

            // Si aucun commentaire n'a été trouvé dans les dernières 24h, on peut ajouter celui-ci:
            const newComment = await Comments.create({
                title,
                content,
                users_id
            });

            // On renvoie un message de succès avec les détails du nouveau commentaire:
            console.log("[ADD COMMENT] Nouveau commentaire ajouté :", newComment);
            res.status(201).json({ message: 'Commentaire ajouté avec succès !', comment: newComment });

        } catch (err) {
            console.error('[ADD COMMENT] Erreur lors de l\'ajout du commentaire :', err);
            res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire.' });
        }
    },

    // Méthode pour récupérer tous les commentaires:
    getAllComments: async (req, res) => {
        try {
            const comments = await Comments.findAll(); // On récupère tous les commentaires de la base de données.
            console.log(`[GET COMMENTS] ${comments.length} commentaire(s) récupéré(s).`);
            res.status(200).json(comments); // On renvoie la liste des commentaires avec un statut 200 (succès).
        } catch (err) {
            console.error('[GET COMMENTS] Erreur lors de la récupération des commentaires :', err);            // En cas d'erreur, on renvoie un message d'erreur général:
            res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
        }
    },

    // Fonction pour mettre à jour un commentaire par ID
    updateComment: async (req, res) => {
        try {
            const { id } = req.params;
            const [updated] = await Comments.update(req.body, { where: { id: req.params.id } });

            if (updated) {
                const updatedComment = await Comments.findOne({ where: { id: req.params.id } });
                console.log(`[UPDATE COMMENT] Commentaire ${id} mis à jour :`, updatedComment);
                return res.status(200).json(updatedComment);
            }
            console.warn(`[UPDATE COMMENT] Commentaire ${id} non trouvé pour mise à jour.`);
            res.status(404).json({ message: 'Commentaire non trouvé.' });
        } catch (err) {
            console.error('[UPDATE COMMENT] Erreur lors de la mise à jour du commentaire :', err);
            res.status(500).json({ message: 'Erreur interne du serveur lors de la mise à jour du commentaire.' });
        }
    },

    // Méthode pour supprimer un commentaire par ID
    deleteComment: async (req, res) => {
        try {
            const { id } = req.params; // Récupère l'ID du commentaire dans l'URL
            const comment = await Comments.findByPk(id); // Cherche le commentaire en base de données

            if (!comment) {
                console.warn(`[DELETE COMMENT] Commentaire ${id} non trouvé.`);
                return res.status(404).json({ message: 'Commentaire non trouvé' });
            }

            // Si le commentaire est trouvé, on le supprime
            await comment.destroy();
            console.log(`[DELETE COMMENT] Commentaire ${id} supprimé.`);
            return res.status(200).json({ message: 'Commentaire supprimé' });
        } catch (err) {
            console.error('[DELETE COMMENT] Erreur lors de la suppression du commentaire :', err);
            res.status(500).json({ message: 'Erreur lors de la suppression du commentaire.' });
        }
    }
};

export default commentController;
