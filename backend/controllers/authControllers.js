import Customers from "../models/customers.js";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import pkg from "pg"; // Importer pg correctement

const { Pool } = pkg; // Utiliser pkg pour importer Pool depuis pg

// On configure le validator:
const validatePassword = (password) => {
    const isPasswordValid = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1, // Nombre minimum de caractères spéciaux requis.
    });

    return isPasswordValid;
};

// On configure le hash:
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Dix est le nombre optimal de tours de hash pour obtenir un password super secret.
        return hashedPassword;
    } catch (error) {
        throw new Error('Erreur lors du hashage du mot de passe', error);
    }
};

// On utilise un pool de connexions pour simplifier la gestion des connexions pour ne pas avoir à créer ou fermer les connexions manuellement à chaque requête.
const pool = new Pool({
    user: 'santiago',
    host: 'localhost',
    database: 'santiago',
    password: 'santiago',
    port: 5432,
});

const authController = {
    // Fonction pour gérer l'inscription:
    signup: async (req, res) => {
        const { firstname, lastname, address, phone, email, password } = req.body;

        try {
            // On vérifie d'abord si l'utilisateur existe déjà
            const existingCustomer = await Customers.findOne({ where: { email } });
            if (existingCustomer) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
            }

            // On vérifie si le password respecte nos conditions:
            if (!validatePassword(password)) {
                return res.status(400).json({ message: 'Le mot de passe doit contenir 8 caractères minimums, une majuscule, une minuscule, un chiffre et un caractère spécial.' });
            }

            // On hash le mot de passe:
            const hashedPassword = await hashPassword(password);

            // On crée un customers:
            const newCustomer = await Customers.create({
                firstname,
                lastname,
                address,
                phone,
                email,
                password: hashedPassword,
            });

            res.status(201).json({ message: 'Bravo, votre inscription est réussie !', customer: newCustomer });
        } catch (err) {
            console.error('Erreur lors de l\'inscription.', err);
            res.status(500).json({ message: 'Dommage, votre inscription n\'a pas abouti !' });
        }
    }
};

export default authController;
