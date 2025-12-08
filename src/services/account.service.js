// Gère l'état de connexion et le rôle de l'utilisateur via Supabase Auth

import { supabase } from "../services/supabaseClient.js";

export const accountService = {
  /**
   * Vérifie si un utilisateur est connecté
   * @returns {Promise<boolean>}
   */
  isLogged: async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      console.error("Erreur récupération session :", error);
      return false;
    }
    return !!session;
  },

  /**
   * Récupère le rôle de l'utilisateur connecté
   * @returns {Promise<string|null>}
   */
  getRole: async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      console.error("Erreur récupération rôle :", error);
      return null;
    }
    if (!session) return null;
    // Le rôle est stocké dans user_metadata
    return session.user.user_metadata?.role || "utilisateur";
  },

  /**
   * Déconnexion de l'utilisateur
   */
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Erreur lors de la déconnexion :", error);
  },

  /**
   * Inscription d'un nouvel utilisateur
   * @param {string} email
   * @param {string} password
   * @param {string} role - rôle par défaut "utilisateur"
   */
  signup: async (email, password, role = "utilisateur") => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }, // stocke le rôle dans user_metadata
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Connexion d'un utilisateur existant
   * @param {string} email
   * @param {string} password
   */
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },
};
