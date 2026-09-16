"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gift, Mail, Lock } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { siteConfig } from "@/lib/site-config";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Incorrect email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal px-4">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 700px at 50% -10%, rgba(176,141,87,0.35), transparent 60%), linear-gradient(180deg, #1D3229 0%, #211F1C 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(216,195,157,0.5) 38px, rgba(216,195,157,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 78px, rgba(216,195,157,0.5) 78px, rgba(216,195,157,0.5) 80px)",
        }}
      />

      <div className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brass/20">
            <Gift className="h-6 w-6 text-brass-light" strokeWidth={1.5} />
          </div>
          <h1 className="mt-4 font-display text-2xl italic text-ivory">
            {siteConfig.storeName}
          </h1>
          <p className="mt-1 text-sm text-ivory/60">Sign in to manage products and orders.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-white/[0.06] py-3 pl-11 pr-4 text-sm text-ivory placeholder:text-ivory/40 outline-none focus:border-brass/60"
            />
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-white/[0.06] py-3 pl-11 pr-4 text-sm text-ivory placeholder:text-ivory/40 outline-none focus:border-brass/60"
            />
          </div>

          <label className="flex items-center gap-2 px-1 text-xs text-ivory/60">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-white/30 bg-transparent text-brass focus:ring-brass/50"
            />
            Keep me signed in on this device
          </label>

          {error && (
            <p className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-300">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-brass px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-brass-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}