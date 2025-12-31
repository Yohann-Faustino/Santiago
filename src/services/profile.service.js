import { supabase } from "./supabaseClient.js";

/**
 * Récupère le profil de l'utilisateur connecté
 * @returns {Promise<object>} Données de l'utilisateur
 */
export const getProfile = async () => {
  // 🔹 Récupération de la session Supabase
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;

  const user = session?.user;
  if (!user) throw new Error("Utilisateur non connecté.");

  // 🔹 Récupère les infos de l'utilisateur dans la table 'users'
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", user.id)
    .single(); // renvoie un objet

  if (error) throw error;

  // ✅ LOG 1 : ce que Supabase renvoie depuis la table users
  console.log("DATA USERS TABLE:", data);

  const result = {
    email: user.email,
    ...data,
  };

  // ✅ LOG 2 : objet final renvoyé au front (IMPORTANT)
  console.log("PROFILE FINAL:", result);
  console.log("ROLE FINAL:", result.role);

  return result;
};

/**
 * Met à jour le profil de l'utilisateur
 * @param {object} profileData - Données à mettre à jour
 * @param {string} currentPassword - Mot de passe actuel pour vérification
 * @returns {Promise<object>} Données mises à jour
 */
export const updateProfile = async (profileData, currentPassword) => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  const user = session?.user;
  if (!user) throw new Error("Utilisateur non connecté.");

  // Optionnel : tu peux vérifier le mot de passe actuel en tentant un login
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });
  if (verifyError) throw new Error("Mot de passe actuel incorrect.");

  // Mise à jour des informations dans la table 'users'
  const { data, error } = await supabase
    .from("users")
    .update(profileData)
    .eq("auth_id", user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Met à jour le mot de passe de l'utilisateur
 * @param {object} passwordData - { currentPassword, newPassword }
 * @returns {Promise<object>}
 */
export const updatePassword = async (passwordData) => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session) throw new Error("Utilisateur non connecté.");

  // Met à jour le mot de passe dans Supabase Auth
  const { error } = await supabase.auth.updateUser({
    password: passwordData.newPassword,
  });

  if (error) throw error;
  return { message: "Mot de passe mis à jour." };
};
