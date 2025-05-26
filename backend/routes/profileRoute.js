import express from 'express';
import Users from '../models/users.js';
import profileController from '../controllers/profileControllers.js';
import authMiddlewareToken from '../middlewares/authMiddlewareToken.js';

const router = express.Router();

// Middleware pour sécuriser toutes les routes ci-dessous
router.use(authMiddlewareToken);

// Route pour récupérer le profil de l'utilisateur connecté:
router.get('/', async (req, res) => {
    try {
        const user = await Users.findOne({ where: { id: req.userId } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json(user);
    } catch (err) {
        console.error('Erreur lors de la récupération du profil :', err);
        res.status(500).json({ message: 'Erreur lors de la récupération du profil.' });
    }
});

// Mise à jour des données du profil
router.put('/update', profileController.updateProfile);

// Mise à jour du mot de passe
router.put('/password', profileController.updatePassword);

export default router;
