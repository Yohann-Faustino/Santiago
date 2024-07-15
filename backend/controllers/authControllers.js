// authControllers.js

import Users from '../models/users.js'
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Fonction pour valider le password:
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

// Fonction pour hacher le password:
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erreur lors du hashage du mot de passe', error);
    }
};

const authController = {
    // Fonction pour l'inscription des Users:
    signup: async (req, res) => {
        const { firstname, lastname, address, city, postalcode, phone, email, password } = req.body;

        console.log('données de l\'inscription reçues', req.body)
        
        try {
            // Vérifier si le Users existe déjà:
            const existingUser = await Users.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
            }

            // Valider le password:
            if (!validatePassword(password)) {
                return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.' });
            }

            // Hasher le password:
            const hashedPassword = await hashPassword(password);

            // Créer un nouveau Users:
            const newUser = await Users.create({
                firstname,
                lastname,
                address,
                city,
                postalcode,
                phone,
                email,
                password: hashedPassword,
            });

            res.status(201).json({ message: 'Inscription réussie !', user: newUser });

        } catch (err) {
            console.error('Erreur lors de l\'inscription.', err);
            res.status(500).json({ message: 'Dommage, votre inscription n\'a pas abouti !' });
        }
    },


    // Fonction pour la connexion des Users:
    login: async (req, res) => {
        const {email, password} = req.body;

        try {
            // On vérifie si le Users existe grace au mail qu'il a saisie:
            const user = await Users.findOne({where:{email}});
            if(!user) {
                return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
            }

            // On vérifie si, une fois le Users trouvé, le mot de passe correspond:
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid) {
                return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
            }

            // On crée un token jwt:
            const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: '1h'});

            // Connexion avec un token:
            res.status(200).json({ message:'connexion réussie, vous nous avez manqué !', token });
        } catch (error) {
            console.error('Erreur lors de la connexion.', error);
            res.status(500).json({ message: 'Dommage, la connection à échouée...'});
        }
    },


    // Fonction pour récupérer le profil d'un Users:
    profile: async (req, res) => {
        try {
            const user = await Users.findByPk(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'Client non trouvé.' });
            }
            res.status(200).json({ user });
        } catch (error) {
            console.error('Erreur lors de la récupération du profil.', error);
            res.status(500).json({ message: 'Erreur lors de la récupération du profil.' });
        }
    },

    // Fonction pour se déconnecter:
    logout: async (req, res) => {
        req.session.destroy(error => {
            if (error) {
                console.log(error);
                return res.status(500).send('erreur de déconnexion');
            }
            res.redirect('/');
        });
    }
};

export default authController;
