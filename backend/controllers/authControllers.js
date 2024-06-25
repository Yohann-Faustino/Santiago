// authControllers.js

import Customers from "../models/customers.js";
import validator from "validator";
import bcrypt from "bcrypt";

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
    signup: async (req, res) => {
        const { firstname, lastname, address, phone, email, password } = req.body;

        console.log('données de l\'inscription reçues', req.body)
        
        try {
            // Vérifier si l'utilisateur existe déjà
            const existingCustomer = await Customers.findOne({ where: { email } });
            if (existingCustomer) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
            }

            // Valider le mot de passe
            if (!validatePassword(password)) {
                return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.' });
            }

            // Hasher le mot de passe
            const hashedPassword = await hashPassword(password);

            // Créer un nouveau client
            const newCustomer = await Customers.create({
                firstname,
                lastname,
                address,
                phone,
                email,
                password: hashedPassword,
            });

            // Répondre avec un message de succès
            res.status(201).json({ message: 'Inscription réussie !', customer: newCustomer });

        } catch (err) {
            console.error('Erreur lors de l\'inscription.', err);
            res.status(500).json({ message: 'Dommage, votre inscription n\'a pas abouti !' });
        }
    }
};

export default authController;
