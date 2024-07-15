import express from 'express';
import Users from "../models/users.js";
import authMiddlewareToken from '../middlewares/authMiddlewareToken.js';

const router =express.Router();

router.get('/', authMiddlewareToken, async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({message: 'Erreur lors de la récupération des clients.'});
    }
});

export default router;
