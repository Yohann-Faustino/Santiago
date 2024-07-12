// Vérifie si l'utilisateur est connecté sur la route où est apellé AutGuard sinon redirige vers la page de connexion/inscription.
// Children renvoie l'enfant qu'il y a entre les balises <AuthGuard>...<AuthGuard/> dnas les routers.
import React from 'react';
import PropTypes from 'prop-types'; // Importer prop-types
import { Navigate } from 'react-router-dom';
import { accountService } from '../../../src/services/account.service';

const AuthGuard = ({ children }) => {

  if (!accountService.isLogged()) {
    return <Navigate to="/auth/signup" />;
  }

  return children;
};

// Validation des props:
AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthGuard;
