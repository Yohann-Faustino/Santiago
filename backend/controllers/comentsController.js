// Ce service expose des méthodes pour récupérer des commentaires depuis le backend. 
import Comments from "../models/comments.js";
import { Op } from "sequelize";

const commentController = {
    // Méthode pour ajouter un commentaire:
    addComment: async (req, res) => {
        const { title, content, users_id } = req.body; // On récupère les données du commentaire depuis le corps de la requête.

        try {
            // On calcule la date limite entre deux posts de commentaires (ici 24h):
            const dateLimite = new Date(new Date() - 24 * 60 * 60 * 1000);

            // On vérifie si l'utilisateur a déjà posté un commentaire dans les dernières 24h:
            const lastComment = await Comments.findOne({
                where: {
                    users_id: users_id, // On recherche par ID d'utilisateur
                    createdAt: { [Op.gte]: dateLimite } // Et on filtre par date de création après la date limite
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
            const comments = await Comments.findAll(); // On récupère tous les commentaires de la base de données
            res.status(200).json(comments); // On renvoie la liste des commentaires avec un statut 200 (succès)
        } catch (err) {
            console.error('Erreur lors de la récupération des commentaires.', err);
            // En cas d'erreur, on renvoie un message d'erreur général:
            res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
        }
    }
};

export default commentController;
