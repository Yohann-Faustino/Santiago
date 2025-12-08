// Gère les commentaires via Supabase (CRUD)

import { supabase } from "../services/supabaseClient.js";

export const commentService = {
  getAllComments: async () => {
    const { data, error } = await supabase.from("comments").select("*");
    if (error) throw error;
    return data;
  },

  getComment: async (id) => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  updatedComment: async (id, updates) => {
    const { data, error } = await supabase
      .from("comments")
      .update(updates)
      .eq("id", id);
    if (error) throw error;
    return data;
  },

  deleteComment: async (id) => {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return data;
  },

  addComment: async (comment) => {
    const { data, error } = await supabase.from("comments").insert([comment]);
    if (error) throw error;
    return data;
  },
};
