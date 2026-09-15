import { redirect } from "next/navigation";
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

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-canvas min-h-screen">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-64 shrink-0 sm:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="px-6 py-6">
              <p className="font-display text-lg italic text-charcoal">
                {siteConfig.storeName}
              </p>
              <p className="text-xs text-charcoal-soft">Admin</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AdminSidebar />
            </div>
            <div className="p-4">
              <SignOutButton />
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-charcoal/10 px-4 py-4 sm:hidden">
            <p className="font-display text-lg italic text-charcoal">
              {siteConfig.storeName} Admin
            </p>
            <SignOutButton />
          </header>

          {/* Mobile nav - horizontal scroll, same soft-UI treatment */}
          <div className="overflow-x-auto border-b border-charcoal/10 px-4 py-3 sm:hidden">
            <AdminSidebar variant="horizontal" />
          </div>

          <main className="px-4 py-8 sm:px-8 sm:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}