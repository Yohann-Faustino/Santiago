import express from 'express';
const router = express.Router();
import Comments from '../models/comments.js';

router.get('/comments', async (req, res) => {
    try {
        const comments =await Comments.findAll();
        res.json(comments);
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({message: 'Erreur lors de la récupération des commentaires.'})
    }
});

export default router;