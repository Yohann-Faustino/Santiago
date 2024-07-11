// authControllers.js

import Customers from "../models/customers.js";
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
    // Fonction pour l'inscription des Customers:
    signup: async (req, res) => {
        const { firstname, lastname, address, phone, email, password } = req.body;

        console.log('données de l\'inscription reçues', req.body)
        
        try {
            // Vérifier si le Customers existe déjà:
            const existingCustomer = await Customers.findOne({ where: { email } });
            if (existingCustomer) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
            }

            // Valider le password:
            if (!validatePassword(password)) {
                return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.' });
            }

            // Hasher le password:
            const hashedPassword = await hashPassword(password);

            // Créer un nouveau Customers:
            const newCustomer = await Customers.create({
                firstname,
                lastname,
                address,
                phone,
                email,
                password: hashedPassword,
            });

            res.status(201).json({ message: 'Inscription réussie !', customer: newCustomer });

        } catch (err) {
            console.error('Erreur lors de l\'inscription.', err);
            res.status(500).json({ message: 'Dommage, votre inscription n\'a pas abouti !' });
        }
    },


    // Fonction pour la connexion des Customers:
    // login: async (req, res) => {
    //     const {email, password} = req.body;

    //     try {
    //         // On vérifie si le Customers existe grace au mail qu'il a saisie:
    //         const customer = await Customers.findOne({where:{email}});
    //         if(!customer) {
    //             return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    //         }

    //         // On vérifie si, une fois le Customers trouvé, le mot de passe correspond:
    //         const isPasswordValid = await bcrypt.compare(password, customer.password);
    //         if(!isPasswordValid) {
    //             return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    //         }

    //         // On crée un token jwt:
    //         const token = jwt.sign({ id: customer.id}, process.env.JWT_SECRET, { expiresIn: '1h'});

    //         // Connexion avec un token:
    //         res.status(200).json({ message:'connexion réussie, vous nous avez manqué !', token });
    //     } catch (error) {
    //         console.error('Erreur lors de la connexion.', error);
    //         res.status(500).json({ message: 'Dommage, la connection à échouée...'});
    //     }
    // },


    // Fonction pour récupérer le profil d'un Customers:
    profile: async (req, res) => {
        try {
            const customer = await Customers.findByPk(req.customerId);
            if (!customer) {
                return res.status(404).json({ message: 'Client non trouvé.' });
            }
            res.status(200).json({ customer });
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
