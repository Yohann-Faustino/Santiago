import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize'; // Assurez-vous d'importer Op
import Users from '../models/users.js';
import validator from 'validator';

// Fonction pour valider le mot de passe
const validatePassword = (password) => {
    const isPasswordValid = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    });
    return isPasswordValid;
};

// Fonction pour hacher le mot de passe
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erreur lors du hashage du mot de passe', error);
    }
};

const authController = {
    // Fonction pour l'inscription des utilisateurs
    signup: async (req, res) => {
        const { firstname, lastname, address, city, postalcode, phone, email, password } = req.body;

        console.log('Données de l\'inscription reçues', req.body);

        try {
            // Vérifie si l'utilisateur existe déjà
            const existingUser = await Users.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
            }

            // Valide le mot de passe
            if (!validatePassword(password)) {
                return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.' });
            }

            // Hache le mot de passe
            const hashedPassword = await hashPassword(password);

            // Vérifie combien d'utilisateurs valides existent déjà (ignore l'user vide de la bdd):
            const userCount = await Users.count({
                where: {
                    firstname: {
                        [Op.ne]: '' // Assure que les utilisateurs avec des champs vides sont ignorés.
                    }
                }
            });

            // On vérifie l'inscrit est le premier de la bdd et si c'est le cas il est admin:
            const isAdmin = userCount === 0; // Le premier utilisateur valide est défini comme admin.
            console.log(`Nombre d'utilisateurs valides: ${userCount}`);
            console.log(`Défini comme admin: ${isAdmin}`);

            // Crée un nouvel utilisateur
            const newUser = await Users.create({
                firstname,
                lastname,
                address,
                city,
                postalcode,
                phone,
                email,
                password: hashedPassword,
                role: isAdmin ? 'admin' : 'user' // Détermine si l'utilisateur est un admin ou non
            });

            // Création du token JWT
            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ token });
        } catch (err) {
            console.error('Erreur lors de l\'inscription.', err);
            res.status(500).json({ message: 'Dommage, votre inscription n\'a pas abouti !' });
        }
    },

    // Fonction pour la connexion des utilisateurs
    login: async (req, res) => {
        const { email, password } = req.body;

        // Validation des champs
        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
        }

        try {
            // Recherche de l'utilisateur par email
            const user = await Users.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
            }

            // Vérification du mot de passe
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
            }

            // Création du token JWT
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            console.error('Erreur lors de la connexion.', error);
            res.status(500).json({ message: 'Dommage, la connexion a échoué.' });
        }
    },

    // Fonction pour récupérer le profil d'un utilisateur
    profile: async (req, res) => {
        try {
            const user = await Users.findByPk(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }
            res.status(200).json({ user });
        } catch (error) {
            console.error('Erreur lors de la récupération du profil.', error);
            res.status(500).json({ message: 'Erreur lors de la récupération du profil.' });
        }
    },

    // Fonction pour se déconnecter
    logout: async (req, res) => {
        req.session.destroy(error => {
            if (error) {
                console.log(error);
                return res.status(500).send('Erreur de déconnexion');
            }
            res.redirect('/');
        });
    }
};

export default authController;
