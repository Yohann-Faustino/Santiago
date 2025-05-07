// Ce service expose des méthodes pour s'authentifier.

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import Users from '../models/users.js';
import validator from 'validator';

// Fonction pour valider le mot de passe si le mot de passe respecte certains critères de sécurité:
const validatePassword = (password) => {
    return validator.isStrongPassword(password, {
        minLength: 8, // Au moins 8 caractères
        minLowercase: 1, // Au moins une minuscule
        minUppercase: 1, // Au moins une majuscule
        minNumbers: 1, // Au moins un chiffre
        minSymbols: 1, // Au moins un caractère spécial
    });
};

// Fonction pour hacher le mot de passe avec bcrypt:
const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10); // Le '10' est le nombre de rounds de salage
    } catch (error) {
        throw new Error('Erreur lors du hashage du mot de passe');
    }
};

const authController = {
    // Fonction d'inscription
    async signup(req, res) {
        const {
            firstname,
            lastname,
            address,
            city,
            postalcode,
            phone,
            email,
            password
        } = req.body;

        console.log("Requête d'inscription reçue :", req.body);

        try {
            // Vérification de l'existence de l'email
            const userExists = await Users.findOne({ where: { email } });
            if (userExists) {
                return res.status(409).json({ message: "Cet email est déjà utilisé." });
            }

            // Vérifie si le mot de passe est suffisamment sécurisé
            if (!validatePassword(password)) {
                return res.status(400).json({
                    message: "Mot de passe trop faible. Il doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
                });
            }

            // Hash du mot de passe avant enregistrement
            const hashedPassword = await hashPassword(password);

            // Création de l'utilisateur
            const newUser = await Users.create({
                firstname,
                lastname,
                address,
                city,
                postalcode,
                phone,
                email,
                password: hashedPassword
            });

            if (!newUser || !newUser.id) {
                return res.status(500).json({ message: "Erreur lors de la création du compte." });
            }

            // Vérification de la clé secrète pour le token
            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ message: "Clé secrète manquante pour le token." });
            }

            // Création du token JWT
            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

            // Structure de la réponse avec les informations de l'utilisateur et le token
            const userToReturn = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            };

            // Réponse avec le message de succès et le token
            res.status(201).json({ message: "Inscription réussie !", user: userToReturn, token });

        } catch (err) {
            console.error("Erreur lors de l'inscription :", err);
            res.status(500).json({ message: "Dommage, votre inscription n’a pas abouti !" });
        }
    },

    // Fonction pour la connexion des utilisateurs:
    async login(req, res) {
        const { email, password } = req.body;

        // Vérifier si les champs email et mot de passe sont fournis
        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
        }

        try {
            // Chercher l'utilisateur dans la base de données avec l'email fourni
            const user = await Users.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
            }

            // Comparer le mot de passe fourni avec le mot de passe haché en base
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
            }

            // Crée un token JWT pour l'utilisateur au moment de l'authentification
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Réponse avec le token et le rôle de l'utilisateur
            res.status(200).json({
                token,
                user: {
                    role: user.role,
                }
            });
        } catch (error) {
            console.error('Erreur lors de la connexion.', error);
            res.status(500).json({ message: 'Dommage, la connexion a échoué.' });
        }
    },

    // Fonction pour récupérer le profil d'un utilisateur:
    async profile(req, res) {
        try {
            // Chercher l'utilisateur dans la base de données avec l'ID dans le token
            const user = await Users.findByPk(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }
            // Réponse avec les informations de l'utilisateur
            res.status(200).json({ user });
        } catch (error) {
            console.error('Erreur lors de la récupération du profil.', error);
            res.status(500).json({ message: 'Erreur lors de la récupération du profil.' });
        }
    },

    // Fonction pour se déconnecter:
    async logout(req, res) {
        // Détruie la session de l'utilisateur pour le déconnecter
        req.session.destroy(error => {
            if (error) {
                return res.status(500).send('Erreur de déconnexion');
            }
            // Redirige l'utilisateur après la déconnexion
            res.redirect('/');
        });
    }
};

export default authController;
