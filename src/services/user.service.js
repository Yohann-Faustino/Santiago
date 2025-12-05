import { createClient } from "@supabase/supabase-js";

// IMPORTANT : les variables doivent commencer par VITE_ pour fonctionner dans React (Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌ ERROR: Supabase URL or Key is missing. Vérifie ton fichier .env !"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const userService = {
  // Récupère un utilisateur par ID
  getUser: async (id) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Supabase getUser error:", error);
        return { data: {} };
      }
      return { data };
    } catch (err) {
      console.error("❌ Erreur réseau getUser:", err);
      return { data: {} };
    }
  },

  // Met à jour un utilisateur
  updateUser: async (user) => {
    try {
      // On ne touche jamais à l'id
      const { id, ...updateData } = user;
      const { data, error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", id)
        .select();

      if (error) {
        console.error("❌ Supabase updateUser error:", error);
        return null;
      }

      return data;
    } catch (err) {
      console.error("❌ Erreur réseau updateUser:", err);
      return null;
    }
  },

  // Supprime un utilisateur
  deleteUser: async (id) => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) {
        console.error("❌ Supabase deleteUser error:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("❌ Erreur réseau deleteUser:", err);
      return false;
    }
  },

  // Récupère tous les utilisateurs
  getAllUsers: async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("❌ Supabase getAllUsers error:", error);
        return [];
      }

      return data;
    } catch (err) {
      console.error("❌ Erreur réseau getAllUsers:", err);
      return [];
    }
  },
};
