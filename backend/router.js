// Définis et gère les routes BACKEND de notre projet:

import express from 'express';
import sequelize from './datas/database.js';
import usersRoute from './routes/usersRoute.js';
import commentsRoute from './routes/commentsRoute.js';
import appointmentsRoute from './routes/appointmentsRoute.js';
import authController from './controllers/authControllers.js';
import commentController from './controllers/commentsController.js';
import authMiddlewareToken from './middlewares/authMiddlewareToken.js';
import profileRoute from './routes/profileRoute.js';
import profileController from './controllers/profileControllers.js';
import userController from './controllers/userControllers.js';
import authIsAdmin from './controllers/authIsAdmin.js';
import adminControllers from './controllers/adminControllers.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Middleware de limitation sur forgot-password
const forgotPasswordLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1,
  message: {
    message: 'Trop de tentatives de réinitialisation. Réessayez dans 5 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Route pour tester la communication: (interfere avec le deploiement mais si besoin on remet pour etre sur que le server est en route)
// router.get('/', (req, res) => {
//     res.send('Bonjour, le serveur Express est en fonction !')
// });

// Routes pour l'API RESTful qui permet de récupérer tous les rendez-vous, les clients, les commentaires et le profil stockés dans la base de données:
router.use('/users', authMiddlewareToken, usersRoute);
router.use('/comments', commentsRoute); // Pas de authMiddlewareToken car je souhaite que les coms soient accessibles dans le slide sans que l'user soit connecté
router.use('/appointments', authMiddlewareToken, appointmentsRoute);
router.use('/profile', authMiddlewareToken, profileRoute);

// Route pour mettre à jour le profil:
router.put('/profile/update', authMiddlewareToken, profileController.updateProfile);

// Route qui permet l'inscription:
router.post('/signup', authController.signup);

// Route qui permet la connexion:
router.post('/login', authController.login);

// Route qui permet la déconnexion:
router.post('/logout', authController.logout);

// Route qui permet d'ajouter un commentaire:
router.post('/comments', authMiddlewareToken, commentController.addComment)

// Route qui permet de vérifier si la personne qui clique sur le bouton admin en est bien un:
router.get('/admin', authMiddlewareToken, authIsAdmin, adminControllers.getAdminDashboard);

// Route qui permet de supprimer un commentaire:
router.delete('/comments/:id', authMiddlewareToken, authIsAdmin, commentController.deleteComment);

// Route qui permet de supprimer un utilisateur:
router.delete('/users/:id',authMiddlewareToken, authIsAdmin, userController.deleteUser);

// Route qui permet d'accéder au mdp oublié:
router.post('/forgot-password', forgotPasswordLimiter, authController.forgotPassword);

// Route qui permet de reset le mdp oublié:
router.post('/reset-password', authController.resetPassword);

export default router;