import { supabase, isSupabaseConfigured } from "./supabase/client";
import { placeholderCategories, placeholderProducts } from "./placeholder-data";
import type { Category, Product } from "./types";

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured || !supabase) return placeholderCategories;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error || !data || data.length === 0) return placeholderCategories;
  return data as Category[];
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) return placeholderProducts;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return placeholderProducts;
  return data as Product[];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((p) => p.is_featured);
  return featured.length > 0 ? featured : products.slice(0, 4);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) {
    return placeholderProducts.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_available", true)
    .single();

  if (error || !data) {
    return placeholderProducts.find((p) => p.slug === slug) ?? null;
  }
  return data as Product;
}