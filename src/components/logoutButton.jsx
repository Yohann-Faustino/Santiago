import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accountService } from "../services/account.service";
import { UserContext } from "../contexts/UserContext";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { refreshUser } = useContext(UserContext); // pour mettre à jour le contexte après logout
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await accountService.logout(); // supprime session Supabase
      await refreshUser(); // met à jour Nav
      navigate("/"); // redirection vers l'accueil
    } catch (err) {
      console.error("Erreur logout:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? "Déconnexion..." : "Déconnexion"}
    </button>
  );
};

export default LogoutButton;
