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
      className="neu-raised flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm text-charcoal-soft hover:text-forest sm:w-auto"
    >
      <LogOut className="h-4 w-4" /> Sign Out
    </button>
  );
}