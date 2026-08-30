"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import { useStoreSettings } from "@/lib/store-settings-context";
import { formatNaira } from "@/lib/utils";
import { createOrder, buildOrderMessage, type CustomerDetails } from "@/lib/orders";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { COUNTRIES } from "@/lib/countries";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { whatsappNumber } = useStoreSettings();

  const [form, setForm] = useState<CustomerDetails>({
    name: "",
    phone: "",
    email: "",
    country: "Nigeria",
    state: "",
    city: "",
    address: "",
    deliveryInstructions: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Redirect away if there's nothing to check out (but not while we're
  // mid-submit, since clearCart() right before navigating would otherwise
  // bounce the user right back to /cart for a split second).
  useEffect(() => {
    if (items.length === 0 && !submitting) {
      router.replace("/cart");
    }
  }, [items.length, submitting, router]);

  function update<K extends keyof CustomerDetails>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof CustomerDetails, string>> = {};
    if (!form.name.trim()) next.name = "Full name is required";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    else if (!/^[0-9+ ]{7,15}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number";
    if (!form.country) next.country = "Select a country";
    if (!form.state.trim()) next.state = "State / Region is required";
    if (!form.city.trim()) next.city = "City is required";
    if (!form.address.trim()) next.address = "Delivery address is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { order } = await createOrder(items, form);
      const message = buildOrderMessage(order, items, form);
      window.open(buildWhatsAppLink(whatsappNumber, message), "_blank", "noopener,noreferrer");
      clearCart();
      router.push(`/order/${order.order_number}`);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return null; // redirect effect above handles this
  }

  return (
    <>
      <ScrollProgressBar />
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-display text-3xl italic text-charcoal">Checkout</h1>

        <div className="mt-8 grid gap-10 sm:grid-cols-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:col-span-2" noValidate>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-charcoal">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-charcoal">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="080XXXXXXXX"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-charcoal">
                Email <span className="text-charcoal-soft">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest"
              />
            </div>

            <div>
              <label htmlFor="country" className="text-sm font-medium text-charcoal">
                Country
              </label>
              <select
                id="country"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}
              {form.country !== "Nigeria" && (
                <p className="mt-1.5 text-xs text-charcoal-soft">
                  International order — shipping cost and delivery time will be confirmed with you on WhatsApp before payment.
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="state" className="text-sm font-medium text-charcoal">
                  {form.country === "Nigeria" ? "State" : "State / Region"}
                </label>
                {form.country === "Nigeria" ? (
                  <select
                    id="state"
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest"
                  >
                    <option value="">Select state</option>
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="state"
                    type="text"
                    placeholder="e.g. California, Ontario, Greater London"
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest"
                  />
                )}
                {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
              </div>

              <div>
                <label htmlFor="city" className="text-sm font-medium text-charcoal">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest"
                />
                {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="text-sm font-medium text-charcoal">
                Full Delivery Address
              </label>
              <textarea
                id="address"
                rows={2}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest"
              />
              {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="instructions" className="text-sm font-medium text-charcoal">
                Delivery Instructions <span className="text-charcoal-soft">(optional)</span>
              </label>
              <textarea
                id="instructions"
                rows={2}
                placeholder="e.g. landmark, gate color, best time to deliver"
                value={form.deliveryInstructions}
                onChange={(e) => update("deliveryInstructions", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest"
              />
            </div>

            {submitError && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Placing Order..." : "Place Order via WhatsApp"}
            </button>
          </form>

          <div className="h-fit rounded-card bg-ivory-dim p-6">
            <h2 className="font-display text-lg italic text-charcoal">Order Summary</h2>
            <div className="mt-4 flex flex-col gap-2">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm text-charcoal-soft">
                  <span>{quantity} x {product.name}</span>
                  <span className="font-mono text-charcoal">
                    {formatNaira(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-charcoal/10 pt-4 flex justify-between font-medium text-charcoal">
              <span>Subtotal</span>
              <span className="font-mono">{formatNaira(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-charcoal-soft">
              Delivery fee will be confirmed via WhatsApp.
            </p>
            <Link href="/cart" className="mt-4 block text-center text-sm text-forest hover:underline">
              Edit Cart
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
