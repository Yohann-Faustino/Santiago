// src/contexts/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import { accountService } from "../services/account.service";

// Création du contexte utilisateur
export const UserContext = createContext();

// Fournisseur du contexte
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stocke l'utilisateur connecté

  // Fonction pour récupérer les infos utilisateur depuis Supabase
  const refreshUser = async () => {
    try {
      const u = await accountService.getUser(); // getUser() doit retourner l'utilisateur complet
      setUser(u);
    } catch (err) {
      console.error("[UserContext] Erreur récupération utilisateur:", err);
      setUser(null);
    }
  };

  // Au montage du composant, récupère l'utilisateur et écoute localStorage pour les changements de session
  useEffect(() => {
    refreshUser();

    const handleStorage = () => refreshUser(); // si localStorage change (autre onglet), on met à jour
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
