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

export default authController;