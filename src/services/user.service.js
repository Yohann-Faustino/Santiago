// Gère les utilisateurs via Supabase (CRUD)

import { supabase } from "../services/supabaseClient.js";

export const userService = {
  // Récupère tous les utilisateurs
  getAllUsers: async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;
    return data;
  },

  // Récupère un utilisateur par son ID
  getUser: async (id) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  // Met à jour un utilisateur existant avec de nouvelles données
  updateUser: async (user) => {
    const { id, ...updates } = user;
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id);
    if (error) throw error;
    return data;
  },

  // Supprime un utilisateur par son ID
  deleteUser: async (id) => {
    const { data, error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw error;
    return data;
  },

  // Ajoute un nouvel utilisateur
  addUser: async (user) => {
    const { data, error } = await supabase.from("users").insert([user]);
    if (error) throw error;
    return data;
  },
};
