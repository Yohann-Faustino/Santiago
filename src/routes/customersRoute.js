import express from 'express';
const router =express.Router();
import { Customers } from '../models/customers';

router.get('/customers', async (req, res) => {
    try {
        const customers = await Customers.findAll();
        res.json(customers);
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({message: 'Erreur lors de la récupération des clients.'});
    }
});

export default router;
