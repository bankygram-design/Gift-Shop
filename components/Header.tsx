"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useStoreSettings } from "@/lib/store-settings-context";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=flowers", label: "Flowers" },
  { href: "/shop?category=customized-items", label: "Customized" },
  { href: "/shop?category=combo-gift", label: "Combo Gift" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { storeName } = useStoreSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <button
          className="p-1 sm:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-2xl italic font-medium tracking-tight text-charcoal sm:text-3xl"
        >
          <Sparkles className="h-4 w-4 shrink-0 text-brass transition-transform duration-300 group-hover:rotate-12 sm:h-5 sm:w-5" />
          <span className="relative">
            {storeName}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-brass transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>

        <nav className="hidden gap-8 font-body text-sm text-charcoal-soft sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-forest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/shop" aria-label="Search" className="p-1">
            <Search className="h-5 w-5" strokeWidth={1.75} />
          </Link>
          <Link href="/cart" aria-label="View cart" className="relative p-1">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brass px-1 font-mono text-[10px] font-medium text-ivory">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-charcoal/10 px-4 py-3 font-body text-sm sm:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-charcoal-soft transition-colors hover:bg-ivory-dim hover:text-forest"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
