import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Cached server-side read client for the storefront.
 *
 * Next.js 15 does not cache fetch() calls by default, so every page visit was
 * hitting Supabase (store settings in the root layout, plus products and
 * categories on each page). This client caches GET requests for 60 seconds,
 * so Supabase is called at most once a minute per query.
 *
 * Writes and admin pages keep using lib/supabase/client.ts, which is uncached,
 * so admin edits always show up immediately.
 */
const cachedFetch: typeof fetch = (input, init) => {
  const method = (init?.method ?? "GET").toUpperCase();
  if (method !== "GET") return fetch(input, init);
  return fetch(input, {
    ...init,
    next: { revalidate: 60 },
  } as RequestInit);
};

export const cachedSupabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        global: { fetch: cachedFetch },
      })
    : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
