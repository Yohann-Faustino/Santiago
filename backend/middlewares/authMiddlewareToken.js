import jwt from 'jsonwebtoken';

const authMiddlewareToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('L\'Authorization Header est:', authHeader); // Log pour vérifier la présence de l'en-tête

  if (!authHeader) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  // const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
  const token = req.headers && req.headers["authorization"].split(' ')[1]
  // const token = req.headers && req.headers.split(' ')[1];
  // const token = req.headers["authorization"];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.customerId = decoded.id; // Attach customer ID to the request
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error('Erreur lors de la validation du token JWT:', error);
    return res.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
  }
};

export default authMiddlewareToken;
