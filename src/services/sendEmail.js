// Petmet d'envoyer un mail pour le reset du mdp:

import nodemailer from 'nodemailer'

const sendEmail = async ({ to, subject, html }) => {
  try {

    // Vérifie que toutes les variables nécessaires sont bien présentes
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error("❌ Paramètres SMTP manquants dans les variables d'environnement.");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"DECP Support" <${process.env.SMTP_USER}>`,
      to: to, // To est definis dans le authControllers dans sendEmail       
      subject: subject, // subject est definis dans le authControllers dans sendEmail    
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    if (process.env.NODE_ENV === "development") {
      console.log("📧 Email envoyé avec succès :", info.messageId);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Erreur lors de l’envoi de l’email :", error);
    }
    throw new Error('Impossible d’envoyer l’email.');
  }
}

export default sendEmail;


