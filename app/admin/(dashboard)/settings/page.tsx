import { createSupabaseServerClient } from "@/lib/supabase/server";
import StoreSettingsForm from "@/components/admin/StoreSettingsForm";

export default async function AdminSettingsPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("store_settings")
    .select("*")
    .eq("id", 1)
    .single();

  const initial = {
    store_name: data?.store_name ?? "BYSIMON GIFTS",
    whatsapp_number: data?.whatsapp_number ?? "",
    phone: data?.phone ?? null,
    email: data?.email ?? null,
    address: data?.address ?? null,
    instagram: data?.instagram ?? null,
    logo_url: data?.logo_url ?? null,
  };

  return (
    <div>
      <h1 className="font-display text-2xl italic text-charcoal">Store Settings</h1>
      <p className="mt-1 text-sm text-charcoal-soft">
        Changes here apply to the live storefront immediately - no code changes needed.
      </p>
      <div className="mt-6 max-w-2xl">
        <StoreSettingsForm initial={initial} />
      </div>
    </div>
  );
}
