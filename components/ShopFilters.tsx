"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ShopFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "");

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ q: searchInput.trim() || null });
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSearchSubmit} className="relative max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-soft" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search gifts..."
          className="w-full rounded-full border border-charcoal/15 bg-white py-2.5 pl-11 pr-10 text-sm outline-none focus:border-forest"
        />
        {searchInput && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setSearchInput("");
              updateParams({ q: null });
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-soft hover:text-forest"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => updateParams({ category: null })}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
            !activeCategory
              ? "border-forest bg-forest text-ivory"
              : "border-charcoal/15 text-charcoal-soft hover:border-forest hover:text-forest"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => updateParams({ category: category.slug })}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors",
              activeCategory === category.slug
                ? "border-forest bg-forest text-ivory"
                : "border-charcoal/15 text-charcoal-soft hover:border-forest hover:text-forest"
            )}
          >
            <span aria-hidden="true">{category.emoji}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
