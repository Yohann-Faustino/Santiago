// import jwt from 'jsonwebtoken';

// const authMiddlewareToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   console.log('En-têtes de la requête:', req.headers);
//   console.log('L\'Authorization Header est:', authHeader); // Log pour vérifier la présence de l'en-tête

//   if (!authHeader) {
//     return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
//   }

//   // const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
//   const token = req.headers && req.headers["authorization"].split(' ')[1]
//   // const token = req.headers && req.headers.split(' ')[1];
//   // const token = req.headers["authorization"];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id; // Attach user ID to the request
//     next(); // Move to the next middleware or route handler
//   } catch (error) {
//     console.error('Erreur lors de la validation du token JWT:', error);
//     return res.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
//   }
// };

// export default authMiddlewareToken;

import jwt from 'jsonwebtoken';

const authMiddlewareToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('En-têtes de la requête:', req.headers); // Affiche tous les en-têtes de la requête pour déboguer
  console.log('L\'Authorization Header est:', authHeader); // Affiche l'en-tête Authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès non autorisé. Format du token invalide.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET est manquant dans les variables d\'environnement');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Erreur lors de la validation du token JWT:', error);
    return res.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
  }
};

export default authMiddlewareToken;
