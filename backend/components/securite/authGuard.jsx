// Vérifie si l'utilisateur est connecté sur la route où est apellé AutGuard sinon redirige vers la page de connexion/inscription.
// Children renvoie l'enfant qu'il y a entre les balises <AuthGuard>...<AuthGuard/> dnas les routers.
import { Navigate } from 'react-router-dom';

const AuthGuard = ({children}) => {
  let logged = false

  if (!logged) {
    return <Navigate to="/auth/signup"/>
  }

  return children

};

export default AuthGuard;