// Définis et gère les routes BACKEND de notre projet:

import express from 'express';
import sequelize from './datas/database.js';
import usersRoute from './routes/usersRoute.js';
import commentsRoute from './routes/commentsRoute.js';
import appointmentsRoute from './routes/appointmentsRoute.js';
import authController from './controllers/authControllers.js';
import commentController from './controllers/comentsController.js';
import authMiddlewareToken from './middlewares/authMiddlewareToken.js';

const router = express.Router();

// Route pour tester la communication:
router.get('/', (req, res) => {
    res.send('Bonjour, le serveur Express est en fonction !')
});

// Route d'une futur page:
router.get('/saucisson', (req, res) => {
    res.send('saucisson');
});

// Route qui permet d'accèder au profil:
router.get('/profile', authMiddlewareToken, (req, res) => {
    const profileData = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        city: 'Paris',
        postalcode: '75000'
    };
    // Vérifie si la route est atteinte
    console.log('Route /profile atteinte'); 
    res.status(200).json(profileData);
});

// Routes pour l'API RESTful qui permet de récupérer tous les rendez-vous, les clients et les commentaires stockés dans la base de données:
router.use('/users', authMiddlewareToken, usersRoute);
router.use('/comments', authMiddlewareToken, commentsRoute);
router.use('/appointments', authMiddlewareToken, appointmentsRoute);

// Route qui permet l'inscription:
router.post('/signup', authController.signup);

// Route qui permet la connexion:
router.post('/login', authController.login);

// Route qui permet la déconnexion:
router.get('/logout', authController.logout);

// Route qui permet d'ajouter un commentaire:
router.post('/comments', authMiddlewareToken, commentController.addComment)

export default router;
