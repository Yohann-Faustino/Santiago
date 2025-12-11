// Gère l'état de connexion et l'inscription via Supabase Auth

import { supabase } from "../services/supabaseClient.js";

export const accountService = {
  /**
   * Vérifie si un utilisateur est connecté
   * @returns {Promise<boolean>} true si un utilisateur est connecté, sinon false
   */
  isLogged: async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession(); // Récupère la session courante

    if (error) {
      console.error("[ACCOUNT SERVICE] Erreur récupération session :", error);
      return false;
    }

    return !!session; // Renvoie true si une session existe
  },

  /**
   * Déconnexion de l'utilisateur
   */
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error)
      console.error("[ACCOUNT SERVICE] Erreur lors de la déconnexion :", error);
  },

  /**
   * Inscription d'un nouvel utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise<object>} Données de l'utilisateur créé
   */
  signup: async (email, password) => {
    // Appelle Supabase pour créer un utilisateur
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // ⚠️ On ne stocke plus aucun rôle dans les metadata
    });

    if (error) throw error; // Propagation de l'erreur pour le front
    return data; // Retourne les données utilisateur créées
  },

  /**
   * Connexion d'un utilisateur existant
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} Données de session
   */
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error; // Propagation de l'erreur
    return data; // Retourne les données de session
  },
};
