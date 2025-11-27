// Ce contrôleur contient les méthodes d'inscription, de connexion, de récupération de profil et de déconnexion.

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import Users from "../models/users.js";
import validator from "validator";
import crypto from "crypto";
import sendEmail from "../../src/services/sendEmail.js";
import axios from "axios";
import verifyCaptcha from "../utils/verifyCaptcha.js";

// Fonction pour valider le mot de passe si il respecte certains critères de sécurité définis:
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
    throw new Error("Erreur lors du hashage du mot de passe");
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
      password,
      captchaToken,
    } = req.body;

    console.log("[SIGNUP] Reçu :", { email, firstname, lastname });

    // Vérifie le captcha
    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      console.warn("[SIGNUP] Échec de vérification reCAPTCHA pour :", email);
      return res
        .status(400)
        .json({ message: "Échec de vérification reCAPTCHA." });
    }

    try {
      // Vérification de l'existence de l'email
      const userExists = await Users.findOne({ where: { email } });
      if (userExists) {
        console.warn("[SIGNUP] Email déjà utilisé :", email);
        return res.status(409).json({ message: "Cet email est déjà utilisé." });
      }

      const role = "user"; // Par défaut tout le monde est user

      // Vérifie si le mot de passe est suffisamment sécurisé
      if (!validatePassword(password)) {
        console.warn("[SIGNUP] Mot de passe trop faible pour :", email);
        return res.status(400).json({ message: "Mot de passe trop faible." });
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
        password: hashedPassword,
        role,
      });

      if (!newUser || !newUser.id) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la création du compte." });
      }

      // Vérification de la clé secrète pour le token
      if (!process.env.JWT_SECRET) {
        return res
          .status(500)
          .json({ message: "Clé secrète manquante pour le token." });
      }

      // Création du token JWT
      // Penser a modifier aussi la durée du JWT dans login
      const token = jwt.sign(
        { id: newUser.id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
      );

      // Structure de la réponse avec les informations de l'utilisateur et le token
      const userToReturn = {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        role: newUser.role,
      };

      // Réponse avec le message de succès et le token
      res
        .status(201)
        .json({ message: "Inscription réussie !", user: userToReturn, token });
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      res
        .status(500)
        .json({ message: "Dommage, votre inscription n’a pas abouti !" });
    }
  },

  // Fonction pour la connexion des utilisateurs:
  async login(req, res) {
    const { email, password } = req.body;

    // Vérifier si les champs email et mot de passe sont fournis
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email et mot de passe sont requis." });
    }

    try {
      // Chercher l'utilisateur dans la base de données avec l'email fourni
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect." });
      }

      // Comparer le mot de passe fourni avec le mot de passe haché en base
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect." });
      }

      // Crée un token JWT pour l'utilisateur au moment de l'authentification
      // Penser a modifier aussi la durée du JWT dans newUser
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
      );

      // Réponse avec le token et le rôle de l'utilisateur
      res.status(200).json({
        token,
        user: {
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la connexion.", error);
      res.status(500).json({ message: "Dommage, la connexion a échoué." });
    }
  },

  // Fonction pour récupérer le profil d'un utilisateur:
  async profile(req, res) {
    try {
      // Chercher l'utilisateur dans la base de données avec l'ID dans le token
      const user = await Users.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      // Réponse avec les informations de l'utilisateur
      res.status(200).json({ user });
    } catch (error) {
      console.error("Erreur lors de la récupération du profil.", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du profil." });
    }
  },

  // Fonction logout:
  async logout(req, res) {
    return res.status(200).json({ message: "Déconnexion réussie." });
  },

  // Fonction de réinitialisation du mdp:
  async forgotPassword(req, res) {
    const { email, captchaToken } = req.body;

    // Vérification du captcha
    if (!captchaToken) {
      return res.status(400).json({ message: "Captcha manquant." });
    }

    // Vérifie le captcha avec Google
    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return res
        .status(400)
        .json({ message: "Échec de vérification reCAPTCHA." });
    }

    try {
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res
          .status(200)
          .json({
            message:
              "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.",
          });
      }

      // Génère un token de réinitialisation
      const token = crypto.randomBytes(32).toString("hex");
      const expiry = Date.now() + 3600000; // Token de réinitialisation du mdp valable 1h

      // Enregistre le token et sa date d'expiration
      user.resettoken = token;
      user.resettokenexpiry = expiry;
      await user.save();

      // Url a modifier une fois mis en ligne
      // Construit le lien de réinitialisation
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

      // Envoie l’e-mail
      await sendEmail({
        to: user.email,
        subject: "Réinitialisation du mot de passe",
        html: `
    Bonjour ${user.firstname},
    Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetLink}
    Ce lien est valable 1 heure.
  `,
      });

      res
        .status(200)
        .json({ message: "Un email de réinitialisation a été envoyé." });
    } catch (err) {
      console.error("Erreur forgotPassword :", err);
      res
        .status(500)
        .json({ message: "Erreur lors de la demande de réinitialisation." });
    }
  },

  // Fonction de réinitialisation du mot de passe
  async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    if (process.env.NODE_ENV !== "production") {
      console.log("[RESET] Tentative avec token :", token.slice(0, 6) + "...");
    }

    try {
      const user = await Users.findOne({
        where: {
          resettoken: token,
          resettokenexpiry: { [Op.gt]: Date.now() },
        },
      });

      if (!user) {
        return res.status(400).json({ message: "Token invalide ou expiré." });
      }

      if (!validatePassword(newPassword)) {
        return res.status(400).json({ message: "Mot de passe trop faible." });
      }

      user.password = await hashPassword(newPassword);
      user.resettoken = null;
      user.resettokenexpiry = null;
      await user.save();

      res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
    } catch (err) {
      console.error("Erreur resetPassword :", err);
      res.status(500).json({ message: "Échec de la réinitialisation." });
    }
  },
};

export default authController;
