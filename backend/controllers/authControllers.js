import Customers from "../models/customers.js";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

const authController = {

// Fontion pour gérer l'inscription
signup: async (req, res) => {
    const { firstname, lastname, address, phone, email, password } = req.body;

    try {
        // On vérifie d'abord si l'utilisateur existe déjà
        const existingCustomer = await Customers.findOne({where: { email }});
        if (existingCustomer) {
            return res.status(400).json({message: 'Cet email est déjà utilisé.'});
        }

        // On hash le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // Dix est le nombre optimal de tours de hash pour obtenir un password super secret

        // On crée un customers
        const newCustomer = await Customers.create({
            firstname,
            lastname,
            address,
            phone,
            email,
            password: hashedPassword,
        });

        res.status(201).json({message:'Bravo, votre inscription est réussie !', customer: newCustomer});
    } catch (err) {
        console.error('Erreur lors de l\'inscription.', err);
        res.status(500).json({message:'Dommage, votre inscription n\'a pas abboutie !'});
    }
}};

const validatePassword = (password) => {
    const isPasswordValid = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1, // Nombre minimum de caractères spéciaux requis
        returnScore: false, // Retourne un score de robustesse du mot de passe si true
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10
    });

    return isPasswordValid;
}

const saltRounds = 10; // Définis le nombre de tours de cryptage du mot de passe pour créer un hash le plus optimal (10 tours est le chiffre idéale).
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erreur lors du hashage du mot de passe', error)
    }
};

export default authController;