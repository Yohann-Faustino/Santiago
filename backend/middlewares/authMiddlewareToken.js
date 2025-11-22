import jwt from 'jsonwebtoken';

const authMiddlewareToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('L\'Authorization Header est:', authHeader); // Affiche l'en-tête Authorization.

  // Si l'authorization n'est pas présent on rejette la requête:
  if (!authHeader) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  // Vérifie que Le token soit au bon format Bearer sinon la requête est rejetée:
  if (!authHeader.startsWith('Bearer ')) { // Vérifie si l'authorization commence par la chaîne "Bearer " sinon cela signifie que le format du token est invalide.
    return res.status(401).json({ message: 'Accès non autorisé. Format du token invalide.' });
  }

  // Vérifie la présence du token sinon la requête est rejetée:
  const token = authHeader.split(' ')[1]; // On séparer le mot baerer du token pour garder que ce dernier.
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  try {
    // On vérifie que la clé secrète JWT_SECRET est définie dans les variables d'environnement (.env).
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET est manquant dans les variables d\'environnement');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;   // ici
    req.userRole = decoded.role; // optionnel
    /* req.user = {
       id: decoded.id,
       role: decoded.role,
     };*/
    next();
  } catch (error) {
    console.error('Erreur lors de la validation du token JWT:', error);
    return res.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
  }
};

export default authMiddlewareToken;
