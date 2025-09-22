// src/lib/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// THE TRUTH SERUM: Let's print the variables to the console.
console.log("Supabase URL from env:", import.meta.env.VITE_SUPABASE_URL);
console.log("Supabase Key from env:", import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
