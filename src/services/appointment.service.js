// // Gère les rendez-vous via Supabase (CRUD)

// import { supabase } from "../services/supabaseClient.js";

// export const appointmentService = {
//   getAllAppointments: async () => {
//     const { data, error } = await supabase.from('appointments').select('*');
//     if (error) throw error;
//     return data;
//   },

//   getAppointment: async (id) => {
//     const { data, error } = await supabase.from('appointments').select('*').eq('id', id).single();
//     if (error) throw error;
//     return data;
//   },

//   updateAppointment: async (id, updates) => {
//     const { data, error } = await supabase.from('appointments').update(updates).eq('id', id);
//     if (error) throw error;
//     return data;
//   },

//   deleteAppointment: async (id) => {
//     const { data, error } = await supabase.from('appointments').delete().eq('id', id);
//     if (error) throw error;
//     return data;
//   },

//   addAppointment: async (appointment) => {
//     const { data, error } = await supabase.from('appointments').insert([appointment]);
//     if (error) throw error;
//     return data;
//   },
// };
