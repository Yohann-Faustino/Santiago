// Gère les commentaires via Supabase (CRUD)

import { supabase } from "../services/supabaseClient.js";

export const commentService = {
  // Récupère tous les commentaires
  getAllComments: async () => {
    const { data, error } = await supabase.from("comments").select("*");
    if (error) throw error;
    return data;
  },

  // Récupère un commentaire par son ID
  getComment: async (id) => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  // Met à jour un commentaire existant avec de nouvelles données
  updatedComment: async (id, updates) => {
    const { data, error } = await supabase
      .from("comments")
      .update(updates)
      .eq("id", id);
    if (error) throw error;
    return data;
  },

  // Supprime un commentaire par son ID
  deleteComment: async (id) => {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return data;
  },

  // Ajoute un nouveau commentaire
  addComment: async (comment) => {
    const { data, error } = await supabase.from("comments").insert([comment]);
    if (error) throw error;
    return data;
  },
};
