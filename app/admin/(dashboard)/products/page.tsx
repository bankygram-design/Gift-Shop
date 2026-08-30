import Link from "next/link";
import { Plus } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ProductsTable from "@/components/admin/ProductsTable";
import type { Category, Product } from "@/lib/types";

export default async function AdminProductsPage() {
  const supabase = await createSupabaseServerClient();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: false }),
    supabase.from("categories").select("*").order("name", { ascending: true }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl italic text-charcoal">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-ivory hover:bg-forest-dark"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="mt-6">
        <ProductsTable
          initialProducts={(products as Product[]) ?? []}
          categories={(categories as Category[]) ?? []}
        />
      </div>
    </div>
  );
}
