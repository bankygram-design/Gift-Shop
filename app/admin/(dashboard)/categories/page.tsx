import { createSupabaseServerClient } from "@/lib/supabase/server";
import CategoriesManager from "@/components/admin/CategoriesManager";
import type { Category } from "@/lib/types";

export default async function AdminCategoriesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-2xl italic text-charcoal">Categories</h1>
      <div className="mt-6">
        <CategoriesManager initialCategories={(categories as Category[]) ?? []} />
      </div>
    </div>
  );
}
