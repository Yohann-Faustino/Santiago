// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer la session et les infos de l'utilisateur
  const refreshUser = async () => {
    setLoading(true);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Erreur récupération session :", sessionError);
      setUser(null);
      setLoading(false);
      return;
    }

    if (!session) {
      setUser(null);
      setLoading(false);
      return;
    }

    const email = session.user.email;

    try {
      // Récupère le rôle depuis la table 'users' côté Supabase
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role, firstname, lastname")
        .eq("email", email)
        .single();

      if (userError) throw userError;

      setUser({
        email,
        role: userData.role || "utilisateur",
        firstname: userData.firstname,
        lastname: userData.lastname,
      });
    } catch (err) {
      console.error("Erreur récupération utilisateur :", err);
      setUser({ email, role: "utilisateur" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();

    // Écoute les changements de session (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      refreshUser();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
