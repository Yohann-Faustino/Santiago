// src/services/profile.service.js
import { supabase } from "./supabaseClient";

// Récupère le profil de l'utilisateur connecté
let getProfile = async () => {
  // Récupère l'utilisateur depuis la session locale
  const user = JSON.parse(localStorage.getItem("supabaseSession"))?.user;
  if (!user) throw new Error("Utilisateur non connecté.");

  // Requête pour récupérer les infos dans la table 'users'
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", user.id)
    .single();

  if (error) throw error; // Erreur Supabase
  return data;
};

// Met à jour le profil utilisateur
let updateProfile = async (profileData) => {
  const user = JSON.parse(localStorage.getItem("supabaseSession"))?.user;
  if (!user) throw new Error("Utilisateur non connecté.");

  // Requête de mise à jour dans la table 'users'
  const { data, error } = await supabase
    .from("users")
    .update(profileData)
    .eq("auth_id", user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Met à jour le mot de passe de l'utilisateur
let updatePassword = async (passwordData) => {
  const session = JSON.parse(localStorage.getItem("supabaseSession"))?.session;
  if (!session) throw new Error("Utilisateur non connecté.");

  // Mise à jour via Supabase Auth
  const { error } = await supabase.auth.updateUser({
    password: passwordData.newPassword,
  });

  if (error) throw error;
  return { message: "Mot de passe mis à jour." };
};

export { getProfile, updateProfile, updatePassword };
