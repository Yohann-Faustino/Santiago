import { Navigate } from "react-router-dom";
import { UserContext } from "../../../src/contexts/UserContext.jsx";
import { useContext } from "react";

const AuthGuard = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Chargement...</p>;

  if (!user) return <Navigate to="/signup" replace />;

  // Bloquer les routes admin si l'utilisateur n'est pas admin
  if (window.location.pathname.startsWith("/admin") && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard;
