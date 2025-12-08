// Gère les utilisateurs via Supabase (CRUD)

import { supabase } from "../services/supabaseClient.js";

export const userService = {
  getAllUsers: async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;
    return data;
  },

  getUser: async (id) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  updateUser: async (user) => {
    const { id, ...updates } = user;
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id);
    if (error) throw error;
    return data;
  },

  deleteUser: async (id) => {
    const { data, error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw error;
    return data;
  },

  addUser: async (user) => {
    const { data, error } = await supabase.from("users").insert([user]);
    if (error) throw error;
    return data;
  },
};
