import { supabase, isSupabaseConfigured } from "./supabase/client";
import { siteConfig } from "./site-config";

export interface StoreSettings {
  storeName: string;
  whatsappNumber: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  instagram: string | null;
  logoUrl: string | null;
}

const fallback: StoreSettings = {
  storeName: siteConfig.storeName,
  whatsappNumber: siteConfig.whatsappNumber,
  phone: null,
  email: siteConfig.email || null,
  address: null,
  instagram: siteConfig.instagram || null,
  logoUrl: null,
};

/** Fetches the single store_settings row. Used once, server-side, in the root layout. */
export async function getStoreSettings(): Promise<StoreSettings> {
  if (!isSupabaseConfigured || !supabase) return fallback;

  const { data, error } = await supabase
    .from("store_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) return fallback;

  return {
    storeName: data.store_name || fallback.storeName,
    whatsappNumber: data.whatsapp_number || fallback.whatsappNumber,
    phone: data.phone,
    email: data.email,
    address: data.address,
    instagram: data.instagram,
    logoUrl: data.logo_url,
  };
}
