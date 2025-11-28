// src/services/profile.service.js
import { supabase } from "./supabaseClient";

// Récupère le profil de l'utilisateur connecté
let getProfile = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error("Utilisateur non connecté.");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", user.id)
    .single();

  if (error) throw error;
  return data;
};

// Met à jour le profil utilisateur
let updateProfile = async (profileData) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error("Utilisateur non connecté.");

  const { data, error } = await supabase
    .from("users")
    .update(profileData)
    .eq("auth_id", user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Met à jour le mot de passe
let updatePassword = async (passwordData) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Utilisateur non connecté.");

  const { error } = await supabase.auth.updateUser({
    password: passwordData.newPassword,
  });

  if (error) throw error;
  return { message: "Mot de passe mis à jour." };
};

export { getProfile, updateProfile, updatePassword };
