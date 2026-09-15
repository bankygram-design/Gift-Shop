import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import BulkProductForm from "@/components/admin/BulkProductForm";
import type { Category } from "@/lib/types";

export default async function BulkAddProductsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div>
      <Link
        href="/admin/products"
        className="flex items-center gap-1.5 text-sm text-charcoal-soft hover:text-forest"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <h1 className="mt-3 font-display text-2xl italic text-charcoal">
        Add Multiple Products
      </h1>
      <p className="mt-1 text-sm text-charcoal-soft">
        Fill in as many rows as you like, then submit them all at once. Photos are optional here —
        you can always add or change them later from the product list.
      </p>

      <div className="mt-6">
        <BulkProductForm categories={(categories as Category[]) ?? []} />
      </div>
    </div>
  );
}