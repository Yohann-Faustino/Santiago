import express from 'express';
import { Router } from 'express';
import sequelize from './datas/database.js';
import usersRoute from './routes/usersRoute.js';
import commentsRoute from './routes/commentsRoute.js';
import appointmentsRoute from './routes/appointmentsRoute.js';
import authController from './controllers/authControllers.js';
import commentController from './controllers/comentsController.js';
import authMiddlewareToken from './middlewares/authMiddlewareToken.js';

const router = express.Router();

// Routes suivantes sont celles de notre backend:

// Route pour tester la communication:
router.get('/', (req, res) => {
    res.send('Bonjour, le serveur Express est en fonction !')
});
// Route d'une futur page:
router.get('/saucisson', (req, res) => {
    res.send('saucisson');
});
// Route qui permet la connexion:
router.get('/profile'/*, authController.profile, authMiddlewareToken*/, (req, res) => {
    res.send('profile');
});

// Routes pour l'API RESTful qui permet de récupérer tous les rendez-vous, les clients et les commentaires stockés dans la base de données:
router.use('/users', authMiddlewareToken, usersRoute);
router.use('/comments', authMiddlewareToken, commentsRoute);
router.use('/appointments', authMiddlewareToken, appointmentsRoute);

// Route qui permet l'inscritption:
router.post('/signup', authController.signup);

// Route qui permet la connexion:
router.post('/login', authController.login);

// Route qui permet la déconnexion:
router.get('/logout', authController.logout);

// Route qui permet d'ajouter un commentaire:
router.post('/comments', authMiddlewareToken, commentController.addComment)

export default router;