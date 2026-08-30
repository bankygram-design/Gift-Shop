import { createSupabaseServerClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SignOutButton from "@/components/admin/SignOutButton";
import { siteConfig } from "@/lib/site-config";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-ivory sm:flex-row">
      <AdminSidebar />

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-charcoal/10 bg-white px-4 py-3 sm:px-8">
          <p className="font-display italic text-charcoal">
            {siteConfig.storeName} Admin
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-charcoal-soft sm:inline">
              {user?.email}
            </span>
            <SignOutButton />
          </div>
        </header>

        <main className="px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
