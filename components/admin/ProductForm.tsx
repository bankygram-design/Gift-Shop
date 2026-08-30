"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gift, Upload } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { slugify } from "@/lib/utils";
import type { Category, Product } from "@/lib/types";

interface ProductFormProps {
  categories: Category[];
  mode: "create" | "edit";
  initialProduct?: Product;
}

export default function ProductForm({ categories, mode, initialProduct }: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialProduct?.name ?? "");
  const [slug, setSlug] = useState(initialProduct?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [price, setPrice] = useState(initialProduct?.price?.toString() ?? "");
  const [categoryId, setCategoryId] = useState(initialProduct?.category_id ?? categories[0]?.id ?? "");
  const [stock, setStock] = useState(initialProduct?.stock?.toString() ?? "");
  const [isAvailable, setIsAvailable] = useState(initialProduct?.is_available ?? true);
  const [isFeatured, setIsFeatured] = useState(initialProduct?.is_featured ?? false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialProduct?.image_url ?? null);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !slug.trim() || !price || !categoryId) {
      setError("Please fill in name, price, and category.");
      return;
    }
    const priceNumber = Number(price);
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      setError("Price must be a valid number.");
      return;
    }

    setSubmitting(true);
    const supabase = createSupabaseBrowserClient();

    try {
      let imageUrl = initialProduct?.image_url ?? null;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `${slug}-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(path, imageFile, { upsert: false });

        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(path);
        imageUrl = publicUrlData.publicUrl;
      }

      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        price: priceNumber,
        category_id: categoryId,
        stock: stock ? Number(stock) : null,
        is_available: isAvailable,
        is_featured: isFeatured,
        image_url: imageUrl,
      };

      if (mode === "create") {
        const { error: insertError } = await supabase.from("products").insert(payload);
        if (insertError) throw new Error(insertError.message);
      } else if (initialProduct) {
        const { error: updateError } = await supabase
          .from("products")
          .update(payload)
          .eq("id", initialProduct.id);
        if (updateError) throw new Error(updateError.message);
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Check the slug isn't already used."
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-charcoal">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-forest"
            />
          </div>

          <div>
            <label htmlFor="slug" className="text-sm font-medium text-charcoal">
              URL Slug
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm font-mono outline-none focus:border-forest"
            />
            <p className="mt-1 text-xs text-charcoal-soft">
              Appears in the product URL. Must be unique.
            </p>
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium text-charcoal">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-forest"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="price" className="text-sm font-medium text-charcoal">
              Price (₦)
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm font-mono outline-none focus:border-forest"
            />
          </div>

          <div>
            <label htmlFor="category" className="text-sm font-medium text-charcoal">
              Category
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-forest"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="stock" className="text-sm font-medium text-charcoal">
              Stock <span className="text-charcoal-soft">(optional)</span>
            </label>
            <input
              id="stock"
              type="number"
              min="0"
              step="1"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm font-mono outline-none focus:border-forest"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-charcoal">Product Image</label>
            <div className="mt-1.5 flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ivory-dim">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <Gift className="h-6 w-6 text-brass" strokeWidth={1.5} />
                )}
              </div>
              <label className="flex cursor-pointer items-center gap-2 rounded-full border border-charcoal/15 px-4 py-2 text-sm text-charcoal-soft hover:border-forest hover:text-forest">
                <Upload className="h-4 w-4" />
                {imagePreview ? "Change Image" : "Upload Image"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="h-4 w-4 rounded border-charcoal/30 text-forest focus:ring-forest"
              />
              Available for purchase
            </label>
            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-charcoal/30 text-forest focus:ring-forest"
              />
              Show in Featured Gifts
            </label>
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : mode === "create" ? "Add Product" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
