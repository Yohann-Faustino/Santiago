import express from 'express';
import Users from '../models/users.js';
const router = express.Router();

// Route pour récupérer tous les utilisateurs:
router.get('/', async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
});

// Route pour récupérer un utilisateur par ID:
router.get('/:id', async (req, res) => {
    try {
        const user = await Users.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur.' });
    }
});

// Route pour mettre à jour un utilisateur par ID:
router.patch('/:id', async (req, res) => {
    try {
        const [updated] = await Users.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedUser = await Users.findOne({ where: { id: req.params.id } });
            return res.status(200).json(updatedUser);
        }

        res.status(404).json({ message: 'Utilisateur non trouvé.' });
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
});

export default router;
