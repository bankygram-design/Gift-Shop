import { createBrowserClient } from "@supabase/ssr";

/**
 * Use this (not lib/supabase/client.ts) for anything auth-related in
 * Client Components - login form, sign out button, etc. It keeps the
 * session in cookies so the server (middleware, server components) can
 * see who's logged in too.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
