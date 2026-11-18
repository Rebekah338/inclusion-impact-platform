import { supabaseAdmin } from "./supabase";

// Saves a copy of a website form submission in Supabase (table: website_signups).
// Returns true when the copy was saved. Never throws, so a Supabase problem
// cannot stop a sign up or enquiry from going through.

export type BackupForm = "early-access" | "newsletter" | "starting-point-finder" | "contact" | "see-whats-inside";

export async function backupSubmission(entry: {
  form: BackupForm;
  email: string;
  firstName?: string;
  lastName?: string;
  details?: Record<string, unknown>;
}): Promise<boolean> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error("Supabase is not configured; backup not saved");
    return false;
  }
  try {
    const { error } = await supabaseAdmin()
      .from("website_signups")
      .insert({
        form: entry.form,
        email: entry.email,
        first_name: entry.firstName || null,
        last_name: entry.lastName || null,
        details: entry.details || {},
      });
    if (error) {
      console.error("Supabase backup error", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Supabase backup failed", err);
    return false;
  }
}
