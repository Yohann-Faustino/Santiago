import express from 'express';
import commentController from '../controllers/commentsController.js';
import Comments from '../models/comments.js';
import authMiddlewareToken from '../middlewares/authMiddlewareToken.js';

const router = express.Router();

// Route pour ajouter un commentaire
router.post('/', authMiddlewareToken, commentController.addComment);

// Route pour récupérer tous les commentaires
router.get('/', commentController.getAllComments);

// Route pour récupérer un commentaire par ID
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comments.findOne({ where: { id: req.params.id } });
        if (!comment) {
            return res.status(404).json({ message: 'Commentaire non trouvé.' });
        }
        res.json(comment);
    } catch (err) {
        console.error('Erreur lors de la récupération du commentaire :', err);
        res.status(500).json({ message: 'Erreur lors de la récupération du commentaire.' });
    }
});

// Route pour mettre à jour un commentaire par ID
router.patch('/:id', authMiddlewareToken, async (req, res) => {
    const commentId = req.params.id; 

   // Console.log en dev seulement
    if (process.env.NODE_ENV !== 'production') {
      console.log('ID du commentaire à mettre à jour :', commentId);
      console.log('Données de mise à jour :', req.body);
    }

    // Extraire seulement les champs nécessaires
    const { title, content, users_id } = req.body;

    try {
        const updatedComment = await Comments.update(
            { title, content, users_id },
            { where: { id: commentId } }
        );

        // Vérifie si la mise à jour a bien eu lieu
        if (updatedComment[0] === 0) {
            return res.status(404).json({ message: 'Commentaire non trouvé ou aucune modification effectuée.' });
        }

        res.json({ message: 'Commentaire mis à jour avec succès.' });
    } catch (err) {
        console.error('Erreur lors de la mise à jour du commentaire :', err);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du commentaire.' });
    }
});

// Route pour supprimer un commentaire par ID
router.delete('/:id', authMiddlewareToken, async (req, res) => {
    try {
        const commentId = req.params.id;
        const deleted = await Comments.destroy({ where: { id: commentId } });

        if (deleted) {
            console.log(`Commentaire ${commentId} supprimé.`);
            res.status(200).json({ message: "Commentaire supprimé" });
        } else {
            res.status(404).json({ message: "Commentaire non trouvé." });
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du commentaire :", error);
        res.status(500).json({ message: "Erreur lors de la suppression" });
    }
});

export default router;
