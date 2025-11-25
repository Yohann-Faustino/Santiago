// src/services/account.service.js
import { supabase } from "./supabaseClient";

let signUp = async (formData) => {
  // création de l'utilisateur dans Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp(
    {
      email: formData.email,
      password: formData.password,
    },
    { redirectTo: import.meta.env.VITE_APP_URL + "/login" } // redirection après confirmation email
  );
  if (authError) throw authError;

  const user = authData.user;

  // création de l'utilisateur dans la table users
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

let login = async (credentials) => {
  // connexion avec Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
  if (error) throw error;

  // stockage de la session et de l'utilisateur dans localStorage
  localStorage.setItem("supabaseSession", JSON.stringify(data.session));
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

let logout = async () => {
  // déconnexion Supabase et nettoyage localStorage
  await supabase.auth.signOut();
  localStorage.removeItem("supabaseSession");
  localStorage.removeItem("user");

  // notifie autres onglets
  window.dispatchEvent(new Event("storage"));
};

let isLogged = () => !!localStorage.getItem("user"); // vérifie si connecté

let getToken = () =>
  JSON.parse(localStorage.getItem("supabaseSession"))?.access_token || null; // récupère token

let getUser = () => {
  // récupère l'utilisateur complet depuis localStorage
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

let getRole = async () => {
  // récupère rôle depuis la table users
  const user = getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("users")
    .select("role")
    .eq("auth_id", user.id)
    .single();

  return data?.role || null;
};

export const accountService = {
  signUp,
  login,
  logout,
  isLogged,
  getToken,
  getUser,
  getRole,
};
