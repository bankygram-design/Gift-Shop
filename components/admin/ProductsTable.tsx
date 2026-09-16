"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Gift } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { formatNaira, cn } from "@/lib/utils";
import type { Category, Product } from "@/lib/types";

export default function ProductsTable({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? "Uncategorized";

  async function toggleField(product: Product, field: "is_available" | "is_featured") {
    setBusyId(product.id);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const newValue = !product[field];

    const { error: updateError } = await supabase
      .from("products")
      .update({ [field]: newValue })
      .eq("id", product.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, [field]: newValue } : p))
      );
    }
    setBusyId(null);
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setBusyId(product.id);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (deleteError) {
      setError(deleteError.message);
      setBusyId(null);
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
  }

  if (products.length === 0) {
    return (
      <div className="neu-raised rounded-3xl p-8 text-center text-sm text-charcoal-soft">
        No products yet. Click "Add Product" to create your first one.
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white shadow-sm">
      {error && (
        <p className="border-b border-charcoal/10 bg-red-50 px-6 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-charcoal/10 text-charcoal-soft">
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Available</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className={cn(
                  "border-b border-charcoal/5 last:border-0",
                  busyId === product.id && "opacity-50"
                )}
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-ivory-dim">
                      {product.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Gift className="h-4 w-4 text-brass" strokeWidth={1.5} />
                      )}
                    </div>
                    <span className="text-charcoal">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-charcoal-soft">
                  {categoryName(product.category_id)}
                </td>
                <td className="px-4 py-3 font-mono text-charcoal">
                  {formatNaira(product.price)}
                </td>
                <td className="px-4 py-3 text-charcoal-soft">
                  {product.stock ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    disabled={busyId === product.id}
                    onClick={() => toggleField(product, "is_available")}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      product.is_available
                        ? "neu-pressed text-forest"
                        : "neu-raised text-charcoal-soft"
                    )}
                  >
                    {product.is_available ? "Available" : "Disabled"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    disabled={busyId === product.id}
                    onClick={() => toggleField(product, "is_featured")}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      product.is_featured
                        ? "neu-pressed text-brass"
                        : "neu-raised text-charcoal-soft"
                    )}
                  >
                    {product.is_featured ? "Featured" : "Not Featured"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      aria-label={`Edit ${product.name}`}
                      className="neu-icon-btn flex h-8 w-8 items-center justify-center rounded-full text-charcoal-soft hover:text-forest"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Delete ${product.name}`}
                      disabled={busyId === product.id}
                      onClick={() => handleDelete(product)}
                      className="neu-icon-btn flex h-8 w-8 items-center justify-center rounded-full text-charcoal-soft hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}