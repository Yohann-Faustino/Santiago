// On importe le client Supabase configuré
import { supabase } from "./supabaseClient.js";

// Envoie l'email de réinitialisation du mot de passe
export const forgotPassword = async (email) => {
  // Supabase envoie l'email automatiquement
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    // URL où l'utilisateur sera redirigé après avoir cliqué dans l'email
    redirectTo: "http://localhost:5173/reset-password",
  });

  if (error) throw error;
  return data;
};

// Met à jour le mot de passe après avoir cliqué sur le lien reçu par email
export const resetPassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    // Nouveau mot de passe choisi par l'utilisateur
    password: newPassword,
  });

  if (error) throw error;
  return data;
};
