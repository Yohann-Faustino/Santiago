import express from 'express';
import { Router } from 'express';
import sequelize from './datas/database.js';
import customersRoute from './routes/customersRoute.js';
import commentsRoute from './routes/commentsRoute.js';
import appointmentsRoute from './routes/appointmentsRoute.js';
import authController from './controllers/authControllers.js';

const router = express.Router();

// Routes suivantes sont celles de notre backend:

// Route pour tester la communication
router.get('/', (req, res) => {
    res.send('Bonjour, le serveur Express est en fonction !')
});
router.get('/saucisson', (req, res) => {
    res.send('saucisson');
});
router.get('/signup', (req, res) => {
    res.send('signup');
});

// Routes pour l'API RESTful qui permet de récupérer tous les rendez-vous, les clients et les commentaires stockés dans la base de données
router.use('/customers', customersRoute);
router.use('/comments', commentsRoute);
router.use('/appointments', appointmentsRoute);

// Route qui permet de récupérer les infos saisie par l'utilisateur
// router.post('/signup', authController.signup);



export default router;