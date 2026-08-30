"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useStoreSettings } from "@/lib/store-settings-context";

export default function Footer() {
  const { storeName, email, phone } = useStoreSettings();

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 font-display text-xl italic text-ivory">
              <Sparkles className="h-4 w-4 text-brass" />
              {storeName}
            </p>
            <p className="mt-3 max-w-xs text-sm text-ivory/60">
              {siteConfig.description}
            </p>
          </div>

          <div className="text-sm">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Shop</p>
            <ul className="mt-4 space-y-2.5 text-ivory/70">
              <li><Link href="/shop" className="transition-colors hover:text-brass">All Gifts</Link></li>
              <li><Link href="/shop?category=flowers" className="transition-colors hover:text-brass">Flowers</Link></li>
              <li><Link href="/shop?category=customized-items" className="transition-colors hover:text-brass">Customized Items</Link></li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Get in Touch</p>
            <ul className="mt-4 space-y-2.5 text-ivory/70">
              <li>WhatsApp ordering available</li>
              {phone && <li>{phone}</li>}
              {email && <li>{email}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {storeName}. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.15em]">Curated with care</p>
        </div>
      </div>
    </footer>
  );
}
