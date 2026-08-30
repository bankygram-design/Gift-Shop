"use client";

import { useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { formatNaira } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export default function ProductDetailActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  // NOTE: this WhatsApp link is a temporary stand-in. Once the cart + checkout
  // flow is built (Phase 7-9), "Buy Now" will go through the proper
  // cart -> customer details -> order-record -> WhatsApp flow instead of
  // jumping straight to WhatsApp like this.
  const buyNowMessage = `Hello! I'd like to order:\n\n${quantity} x ${product.name} - ${formatNaira(
    product.price
  )} each\n\nSubtotal: ${formatNaira(product.price * quantity)}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-charcoal-soft">Quantity</span>
        <div className="flex items-center gap-3 rounded-full border border-charcoal/15 px-3 py-1.5">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-1 text-charcoal-soft hover:text-forest"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-5 text-center font-mono text-sm">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="p-1 text-charcoal-soft hover:text-forest"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.is_available}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-forest px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" /> Added to Cart
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
        <a
          href={product.is_available ? buildWhatsAppLink(buyNowMessage) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!product.is_available}
          className="flex-1 rounded-full border border-forest px-6 py-3 text-center text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-ivory aria-disabled:pointer-events-none aria-disabled:opacity-50"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
}
