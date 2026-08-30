"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="flex items-center gap-1.5 rounded-full border border-charcoal/15 px-4 py-2 text-sm text-charcoal-soft transition-colors hover:border-forest hover:text-forest"
    >
      <LogOut className="h-4 w-4" /> Sign Out
    </button>
  );
}
