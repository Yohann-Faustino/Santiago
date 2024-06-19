import express from 'express';
const router = express.Router();
import { Appointments } from '../models/appointments';

router.get('/appointments', async (req, res) => {
    try {
        const appointments =await Appointments.findAll();
        res.json(appointments);
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({message: 'Erreur lors de la récupération des rendez vous.'})
    }
});

export default router;