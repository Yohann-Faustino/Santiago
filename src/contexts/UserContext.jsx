import { createContext, useState, useEffect } from "react";
import { accountService } from "../services/account.service";

// Création du contexte utilisateur
// Permet de partager l'état utilisateur dans toute l'application
export const UserContext = createContext();

// Fournisseur du contexte
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stocke l'utilisateur connecté

  // Fonction pour récupérer les infos utilisateur depuis Supabase / localStorage
  const refreshUser = async () => {
    try {
      // getUser() retourne l'utilisateur complet stocké dans localStorage
      const u = await accountService.getUser();
      setUser(u);
    } catch (err) {
      console.error("[UserContext] Erreur récupération utilisateur:", err);
      setUser(null); // en cas d'erreur, on vide l'utilisateur
    }
  };

  // Au montage du composant :
  // 1. On récupère l'utilisateur actuel
  // 2. On écoute les changements de localStorage (autre onglet)
  useEffect(() => {
    refreshUser(); // récupération initiale

    const handleStorage = () => refreshUser(); // rafraîchit si localStorage change
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    // Fournit l'état utilisateur et la fonction refreshUser aux composants enfants
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
