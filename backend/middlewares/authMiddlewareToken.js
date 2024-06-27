// authMiddlewareToken.js

import jwt from 'jsonwebtoken';

const authMiddlewareToken = (req, res, next) => {
  // Récupérer le token JWT depuis les headers de la requête:
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  try {
    // Vérifier et décoder le token JWT:
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    // Ajouter les données du token à la requête pour l'utiliser ultérieurement:
    req.customerId = decoded.id;

    // Passer à la prochaine étape du middleware
    next();
  } catch (error) {
    console.error('Erreur lors de la validation du token JWT:', error);
    return res.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
  }
};

export default authMiddlewareToken;
