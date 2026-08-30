import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import type { Category, Product } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("categories").select("*").order("name", { ascending: true }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl italic text-charcoal">Edit Product</h1>
      <div className="mt-6 rounded-card bg-white p-6 shadow-card">
        <ProductForm
          categories={(categories as Category[]) ?? []}
          mode="edit"
          initialProduct={product as Product}
        />
      </div>
    </div>
  );
}
