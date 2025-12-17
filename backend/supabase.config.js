import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

// Récupération de l'URL du projet et de la clé service depuis le .env
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
