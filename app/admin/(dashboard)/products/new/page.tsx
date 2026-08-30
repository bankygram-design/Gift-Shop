import { createSupabaseServerClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import type { Category } from "@/lib/types";

export default async function NewProductPage() {
  const supabase = await createSupabaseServerClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-2xl italic text-charcoal">Add Product</h1>
      <div className="mt-6 rounded-card bg-white p-6 shadow-card">
        <ProductForm categories={(categories as Category[]) ?? []} mode="create" />
      </div>
    </div>
  );
}
