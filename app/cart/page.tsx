"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, Gift, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <>
      <ScrollProgressBar />
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-display text-3xl italic text-charcoal">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <ShoppingBag className="h-10 w-10 text-brass" strokeWidth={1.5} />
            <p className="text-charcoal-soft">Your cart is empty.</p>
            <Link
              href="/shop"
              className="rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-ivory hover:bg-forest-dark"
            >
              Browse Gifts
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            <div className="flex flex-col gap-4 sm:col-span-2">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 rounded-card bg-white p-4 shadow-card"
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-ivory-dim"
                  >
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      <Gift className="h-6 w-6 text-brass" strokeWidth={1.5} />
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${product.slug}`}
                          className="font-display italic text-charcoal hover:text-forest"
                        >
                          {product.name}
                        </Link>
                        <p className="font-mono text-sm text-forest-dark">
                          {formatNaira(product.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${product.name}`}
                        onClick={() => removeItem(product.id)}
                        className="p-1 text-charcoal-soft hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 rounded-full border border-charcoal/15 px-2 py-1 self-start">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1 text-charcoal-soft hover:text-forest"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-4 text-center font-mono text-sm">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1 text-charcoal-soft hover:text-forest"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-card bg-ivory-dim p-6">
              <h2 className="font-display text-lg italic text-charcoal">
                Order Summary
              </h2>
              <div className="mt-4 flex justify-between text-sm text-charcoal-soft">
                <span>Subtotal</span>
                <span className="font-mono text-charcoal">
                  {formatNaira(subtotal)}
                </span>
              </div>
              <div className="mt-1 flex justify-between text-sm text-charcoal-soft">
                <span>Delivery</span>
                <span>To be confirmed</span>
              </div>
              <div className="mt-4 border-t border-charcoal/10 pt-4 flex justify-between font-medium text-charcoal">
                <span>Total</span>
                <span className="font-mono">{formatNaira(subtotal)}</span>
              </div>

              {/* NOTE: checkout flow (customer details -> order record -> WhatsApp)
                  is built in Phase 8-9, not yet wired here. */}
              <Link
                href="/checkout"
                className="mt-6 block rounded-full bg-forest px-6 py-3 text-center text-sm font-medium text-ivory hover:bg-forest-dark"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
