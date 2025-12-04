import { supabase } from "./supabaseClient.js";

/**
 * Envoie l'email de réinitialisation via Supabase
 * @param {string} email
 */
export const forgotPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/reset-password", // URL frontend autorisée dans Supabase
  });

  if (error) throw error;
  return data;
};

/**
 * Met à jour le mot de passe côté Supabase après le clic sur le lien email
 * @param {string} newPassword
 */
export const resetPassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
  return data;
};
