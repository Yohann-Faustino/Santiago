import express from 'express';
import Users from '../models/users.js';
const router = express.Router();

// Route pour récupérer le profil de l'utilisateur connecté:
router.get('/', async (req, res) => {
    try {
        const user = await Users.findOne({ where: { id: req.userId } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({ message: 'Erreur lors de la récupération du profil.' });
    }
});

export default router;
