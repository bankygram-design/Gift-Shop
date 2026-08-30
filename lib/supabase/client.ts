import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Public Supabase client - uses the anon key, respects Row Level Security.
 * Safe to use in both server components and client components for
 * read-only data (categories, available products) and inserting orders.
 *
 * Returns null if env vars aren't set yet, so the app can fall back to
 * placeholder data instead of crashing during early development.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
