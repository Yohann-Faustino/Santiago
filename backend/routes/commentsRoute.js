import express from 'express';
import Comments from '../models/comments.js';
import authMiddlewareToken from '../middlewares/authMiddlewareToken.js';

const router = express.Router();

// Middleware d'authentification pour toutes les routes
router.use(authMiddlewareToken);

// Ajouter un nouveau commentaire
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    
    try {
        const newComment = await Comments.create({ title, content });
        res.status(201).json(newComment);
    } catch (err) {
        console.error('Erreur lors de l\'ajout du commentaire :', err);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire.' });
    }
});

// Récupérer tous les commentaires
router.get('/', async (req, res) => {
    try {
        const comments = await Comments.findAll();
        res.json(comments);
    } catch (err) {
        console.error('Erreur lors de la récupération des commentaires :', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
    }
});

export default router;
