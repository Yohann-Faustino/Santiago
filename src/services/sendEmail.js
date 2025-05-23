// Petmet d'envoyer un mail pour le reset du mdp:

import nodemailer from 'nodemailer'

const sendEmail = async ({ to, subject, html }) => {
  try {
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
    console.log('Email envoyé :', info.messageId);
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’email :', error);
    throw new Error('Impossible d’envoyer l’email.');
  }
}

export default sendEmail;


