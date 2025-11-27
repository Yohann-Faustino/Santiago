// src/services/account.service.js
import { supabase } from "./supabaseClient";

// Fonction pour créer un nouvel utilisateur
let signUp = async (formData) => {
  // Création de l'utilisateur dans Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp(
    {
      email: formData.email,
      password: formData.password,
    },
    { redirectTo: import.meta.env.VITE_APP_URL + "/login" } // redirection après confirmation email
  );
  if (authError) throw authError;

  const user = authData.user;

  // Création de l'utilisateur dans la table "users"
  const { data: userData, error: dbError } = await supabase
    .from("users")
    .insert([
      {
        auth_id: user.id,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalcode: formData.postalcode,
        role: "user", // rôle par défaut
      },
    ])
    .select()
    .single();

  if (dbError) throw dbError;

  return { auth: user, user: userData };
};

// Fonction pour se connecter
let login = async (credentials) => {
  // Connexion via Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
  if (error) throw error;

  // Récupération du user depuis la session
  const user = data.user;

  // On récupère le rôle depuis la table "users"
  const { data: userData, error: roleError } = await supabase
    .from("users")
    .select("role")
    .eq("auth_id", user.id)
    .single();

  if (roleError) throw roleError;

  // Stockage de la session et du rôle utilisateur dans le localStorage
  localStorage.setItem("supabaseSession", JSON.stringify(data.session));
  localStorage.setItem(
    "user",
    JSON.stringify({ ...user, role: userData.role })
  );

  return data;
};

// Déconnexion
let logout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("supabaseSession");
  localStorage.removeItem("user");

  // Notifie les autres onglets que l'utilisateur s'est déconnecté
  window.dispatchEvent(new Event("storage"));
};

// Vérifie si un utilisateur est connecté
let isLogged = () => !!localStorage.getItem("user");

// Récupère le token de l'utilisateur
let getToken = () =>
  JSON.parse(localStorage.getItem("supabaseSession"))?.access_token || null;

// Récupère l'utilisateur complet depuis le localStorage
let getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

// Récupère le rôle actuel de l'utilisateur
let getRole = () => {
  const user = getUser();
  return user?.role || null;
};

// Export des fonctions du service
export const accountService = {
  signUp,
  login,
  logout,
  isLogged,
  getToken,
  getUser,
  getRole,
};
