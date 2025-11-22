// Ce service expose des méthodes pour vérifier si la personne qui clique sur le bouton admin caché ou non est bien un admin.

const authIsAdmin = (req, res, next) => {
  if (!req.userRole) {
    return res.status(401).json({ message: 'Non authentifié' });
  }

  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé. Vous devez être administrateur.' });
  }

  next();
};

export default authIsAdmin;
