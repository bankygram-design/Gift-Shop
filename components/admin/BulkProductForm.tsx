"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Gift, Upload, CheckCircle2, XCircle } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { slugify } from "@/lib/utils";
import type { Category } from "@/lib/types";

interface DraftRow {
  key: string;
  name: string;
  price: string;
  categoryId: string;
  stock: string;
  description: string;
  imageFile: File | null;
  imagePreview: string | null;
}

interface RowResult {
  name: string;
  status: "success" | "error";
  message?: string;
}

function emptyRow(defaultCategoryId: string): DraftRow {
  return {
    key: crypto.randomUUID(),
    name: "",
    price: "",
    categoryId: defaultCategoryId,
    stock: "",
    description: "",
    imageFile: null,
    imagePreview: null,
  };
}

export default function BulkProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const defaultCategoryId = categories[0]?.id ?? "";

  const [rows, setRows] = useState<DraftRow[]>([
    emptyRow(defaultCategoryId),
    emptyRow(defaultCategoryId),
    emptyRow(defaultCategoryId),
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<RowResult[] | null>(null);

  function updateRow<K extends keyof DraftRow>(key: string, field: K, value: DraftRow[K]) {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, [field]: value } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, emptyRow(defaultCategoryId)]);
  }

  function removeRow(key: string) {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.key !== key) : prev));
  }

  function handleImageChange(key: string, file: File | null) {
    updateRow(key, "imageFile", file);
    updateRow(key, "imagePreview", file ? URL.createObjectURL(file) : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResults(null);

    const validRows = rows.filter((r) => r.name.trim() && r.price.trim());
    if (validRows.length === 0) {
      setResults([{ name: "(none)", status: "error", message: "No rows had both a name and a price filled in." }]);
      return;
    }

    setSubmitting(true);
    const supabase = createSupabaseBrowserClient();
    const rowResults: RowResult[] = [];

    for (const row of validRows) {
      const priceNumber = Number(row.price);
      if (Number.isNaN(priceNumber) || priceNumber < 0) {
        rowResults.push({ name: row.name, status: "error", message: "Invalid price" });
        continue;
      }
      if (!row.categoryId) {
        rowResults.push({ name: row.name, status: "error", message: "No category selected" });
        continue;
      }

      try {
        const baseSlug = slugify(row.name);
        const slug = `${baseSlug}-${Date.now().toString(36)}${Math.floor(Math.random() * 100)}`;

        let imageUrl: string | null = null;
        if (row.imageFile) {
          const ext = row.imageFile.name.split(".").pop();
          const path = `${slug}.${ext}`;
          const { error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(path, row.imageFile, { upsert: false });
          if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);
          const { data: publicUrlData } = supabase.storage
            .from("product-images")
            .getPublicUrl(path);
          imageUrl = publicUrlData.publicUrl;
        }

        const { error: insertError } = await supabase.from("products").insert({
          name: row.name.trim(),
          slug,
          description: row.description.trim(),
          price: priceNumber,
          category_id: row.categoryId,
          stock: row.stock ? Number(row.stock) : null,
          is_available: true,
          is_featured: false,
          image_url: imageUrl,
        });

        if (insertError) throw new Error(insertError.message);
        rowResults.push({ name: row.name, status: "success" });
      } catch (err) {
        rowResults.push({
          name: row.name,
          status: "error",
          message: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    setResults(rowResults);
    setSubmitting(false);

    if (rowResults.every((r) => r.status === "success")) {
      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 1500);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {rows.map((row, index) => (
          <div key={row.key} className="rounded-card bg-white p-4 shadow-card sm:p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wide text-charcoal-soft">
                Product {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeRow(row.key)}
                aria-label="Remove this row"
                className="p-1 text-charcoal-soft hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-[80px_1fr_1fr]">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-ivory-dim">
                  {row.imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={row.imagePreview} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Gift className="h-5 w-5 text-brass" strokeWidth={1.5} />
                  )}
                </div>
                <label className="flex cursor-pointer items-center gap-1 text-[10px] text-forest hover:underline">
                  <Upload className="h-3 w-3" />
                  Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(row.key, e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Product name"
                  value={row.name}
                  onChange={(e) => updateRow(row.key, "name", e.target.value)}
                  className="rounded-lg border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-forest"
                />
                <input
                  type="text"
                  placeholder="Short description (optional)"
                  value={row.description}
                  onChange={(e) => updateRow(row.key, "description", e.target.value)}
                  className="rounded-lg border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  min="0"
                  placeholder="Price (₦)"
                  value={row.price}
                  onChange={(e) => updateRow(row.key, "price", e.target.value)}
                  className="rounded-lg border border-charcoal/15 px-3 py-2 text-sm font-mono outline-none focus:border-forest"
                />
                <select
                  value={row.categoryId}
                  onChange={(e) => updateRow(row.key, "categoryId", e.target.value)}
                  className="rounded-lg border border-charcoal/15 px-2 py-2 text-sm outline-none focus:border-forest"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min="0"
                  placeholder="Stock"
                  value={row.stock}
                  onChange={(e) => updateRow(row.key, "stock", e.target.value)}
                  className="rounded-lg border border-charcoal/15 px-3 py-2 text-sm font-mono outline-none focus:border-forest"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addRow}
          className="flex items-center justify-center gap-1.5 rounded-full border border-dashed border-charcoal/25 px-5 py-3 text-sm text-charcoal-soft hover:border-forest hover:text-forest"
        >
          <Plus className="h-4 w-4" /> Add Another Row
        </button>

        {results && (
          <div className="flex flex-col gap-1.5 rounded-card bg-ivory-dim p-4">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                {r.status === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-forest" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-red-600" />
                )}
                <span className="text-charcoal">{r.name || "(unnamed)"}</span>
                {r.message && <span className="text-charcoal-soft">— {r.message}</span>}
              </div>
            ))}
            {results.every((r) => r.status === "success") && (
              <p className="mt-1 text-xs text-forest">All added — redirecting to your product list...</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Adding Products..." : `Add All ${rows.filter((r) => r.name.trim()).length || ""} Products`}
        </button>
      </form>
    </div>
  );
}