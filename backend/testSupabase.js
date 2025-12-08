import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

// Récupération de l'URL du projet et de la clé service depuis le .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase.from("users").select("*").limit(1);

  if (error) {
    console.error("❌ Problème de connexion à Supabase:", error);
  } else {
    console.log("✅ Connexion OK, exemple de données Users:", data);
  }
}

testConnection();
