"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Gift, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatNaira, cn, placeholderColorFor } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const placeholderColor = placeholderColorFor(product.id);

  function handleAddToCart() {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div
      className={cn(
        "gift-tag flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-transform duration-200 hover:-translate-y-1",
        className
      )}
    >
      <Link href={`/product/${product.slug}`} className="group block overflow-hidden">
        <div
          className="relative flex aspect-square items-center justify-center"
          style={{ backgroundColor: product.image_url ? undefined : placeholderColor.bg }}
        >
          {product.is_featured && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-brass px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
              ✨ Featured
            </span>
          )}
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <Gift
              className="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
              strokeWidth={1.5}
              style={{ color: placeholderColor.icon }}
            />
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-lg italic leading-snug text-charcoal">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-charcoal-soft">
          {product.description}
        </p>
        <p className="font-mono text-base text-forest-dark">
          {formatNaira(product.price)}
        </p>

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <div className="flex items-center justify-center gap-3 self-start rounded-full border border-charcoal/15 px-2 py-1">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1 text-charcoal-soft hover:text-forest"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-4 text-center font-mono text-sm">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1 text-charcoal-soft hover:text-forest"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.is_available}
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-forest px-4 py-2.5 text-sm font-medium text-ivory transition-all duration-150 hover:bg-forest-dark active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
