import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yolhjhopdzxfyzrwbnwm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvbGhqaG9wZHp4Znl6cndibndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NjY5MDUsImV4cCI6MjA2NzI0MjkwNX0.G7TYI0MrCN3DhdnN267TZ4fwNOUZYr51eDboBpoatL0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
