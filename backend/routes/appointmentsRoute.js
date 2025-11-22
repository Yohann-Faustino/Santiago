// Code pour la suite du projet.

import express from 'express';
import Appointments from '../models/appointments.js';
import authMiddlewareToken from '../middlewares/authMiddlewareToken.js';

const router = express.Router();

// Route pour récupérer tous les rendez-vous:
router.get('/', authMiddlewareToken, async (req, res) => {
    try {
        const appointments =await Appointments.findAll();
        res.json(appointments);
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({message: 'Erreur lors de la récupération des rendez vous.'})
    }
});

export default router;