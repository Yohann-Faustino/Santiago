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

export const commentService = {
  // Récupère tous les commentaires, du plus récent au plus ancien
  getAllComments: async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created", { ascending: false });

      if (error) {
        console.error("❌ Supabase getAllComments error:", error);
        return { data: [] };
      }

      return { data };
    } catch (err) {
      console.error("❌ Erreur réseau getAllComments:", err);
      return { data: [] };
    }
  },

  // Récupère un commentaire via son ID
  getComment: async (id) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Supabase getComment error:", error);
        return null;
      }

      return data;
    } catch (err) {
      console.error("❌ Erreur réseau getComment:", err);
      return null;
    }
  },

  // Ajoute un commentaire
  addComment: async (commentData) => {
    try {
      // Supabase attend un tableau pour insert()
      const { data, error } = await supabase
        .from("comments")
        .insert([commentData])
        .select(); // select() pour récupérer la ligne insérée

      if (error) {
        console.error("❌ Supabase addComment error:", error);
        return null;
      }

      return data;
    } catch (err) {
      console.error("❌ Erreur réseau addComment:", err);
      return null;
    }
  },

  // Met à jour un commentaire existant
  updatedComment: async (comment) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .update(comment)
        .eq("id", comment.id)
        .select();

      if (error) {
        console.error("❌ Supabase updatedComment error:", error);
        return null;
      }

      return data;
    } catch (err) {
      console.error("❌ Erreur réseau updatedComment:", err);
      return null;
    }
  },

  // Supprime un commentaire
  deleteComment: async (id) => {
    try {
      const { error } = await supabase.from("comments").delete().eq("id", id);

      if (error) {
        console.error("❌ Supabase deleteComment error:", error);
        return false;
      }

      return true;
    } catch (err) {
      console.error("❌ Erreur réseau deleteComment:", err);
      return false;
    }
  },
};
