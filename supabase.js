// supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rfxfsykqywfvnaeygmjn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeGZzeWtxeXdmdm5hZXlnbWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MTA0MTgsImV4cCI6MjAzNTQ4NjQxOH0.OC-INCPWdZbwalW3YYp_bWUi_XdujU8NuOnp1htVhVA";
export const supabase = createClient(supabaseUrl, supabaseKey);
