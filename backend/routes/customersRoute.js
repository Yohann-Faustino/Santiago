// import express from 'express';
// import Customers from "../models/customers.js";
// import authMiddlewareToken from '../middlewares/authMiddlewareToken.js';

// const router =express.Router();

// router.get('/', authMiddlewareToken, async (req, res) => {
//     try {
//         const customers = await Customers.findAll();
//         res.json(customers);
//     } catch (err) {
//         console.error('Error', err);
//         res.status(500).json({message: 'Erreur lors de la récupération des clients.'});
//     }
// });

// export default router;
