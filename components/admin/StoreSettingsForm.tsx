"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

interface StoreSettingsRow {
  store_name: string;
  whatsapp_number: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  instagram: string | null;
  logo_url: string | null;
}

export default function StoreSettingsForm({ initial }: { initial: StoreSettingsRow }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof StoreSettingsRow>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.store_name.trim()) {
      setError("Store name is required.");
      return;
    }
    if (!form.whatsapp_number.trim()) {
      setError("WhatsApp number is required.");
      return;
    }

    setSaving(true);
    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase
      .from("store_settings")
      .update({
        store_name: form.store_name.trim(),
        whatsapp_number: form.whatsapp_number.trim(),
        phone: form.phone?.trim() || null,
        email: form.email?.trim() || null,
        address: form.address?.trim() || null,
        instagram: form.instagram?.trim() || null,
        logo_url: form.logo_url?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSaved(true);
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-card bg-white p-6 shadow-card">
      <div>
        <label htmlFor="store_name" className="text-sm font-medium text-charcoal">
          Store Name
        </label>
        <input
          id="store_name"
          type="text"
          value={form.store_name}
          onChange={(e) => update("store_name", e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-forest"
        />
      </div>

      <div>
        <label htmlFor="whatsapp_number" className="text-sm font-medium text-charcoal">
          WhatsApp Number
        </label>
        <input
          id="whatsapp_number"
          type="text"
          placeholder="2348012345678"
          value={form.whatsapp_number}
          onChange={(e) => update("whatsapp_number", e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm font-mono outline-none focus:border-forest"
        />
        <p className="mt-1 text-xs text-charcoal-soft">
          International format, digits only - no + sign, no spaces (e.g. 2348012345678).
          This is where all customer orders will be sent.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-charcoal">
            Phone <span className="text-charcoal-soft">(optional, can differ from WhatsApp)</span>
          </label>
          <input
            id="phone"
            type="text"
            value={form.phone ?? ""}
            onChange={(e) => update("phone", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-forest"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-charcoal">
            Email <span className="text-charcoal-soft">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email ?? ""}
            onChange={(e) => update("email", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-forest"
          />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="text-sm font-medium text-charcoal">
          Address <span className="text-charcoal-soft">(optional)</span>
        </label>
        <input
          id="address"
          type="text"
          value={form.address ?? ""}
          onChange={(e) => update("address", e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-forest"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="instagram" className="text-sm font-medium text-charcoal">
            Instagram <span className="text-charcoal-soft">(optional)</span>
          </label>
          <input
            id="instagram"
            type="text"
            placeholder="@bysimongifts"
            value={form.instagram ?? ""}
            onChange={(e) => update("instagram", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-forest"
          />
        </div>
        <div>
          <label htmlFor="logo_url" className="text-sm font-medium text-charcoal">
            Logo URL <span className="text-charcoal-soft">(optional)</span>
          </label>
          <input
            id="logo_url"
            type="text"
            value={form.logo_url ?? ""}
            onChange={(e) => update("logo_url", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-forest"
          />
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}
      {saved && (
        <p className="rounded-xl bg-forest/10 px-4 py-3 text-sm text-forest">
          Saved. Changes are live on the storefront now.
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
