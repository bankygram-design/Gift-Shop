"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { slugify, cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

export default function CategoriesManager({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!newName.trim()) {
      setError("Category name is required.");
      return;
    }

    setAdding(true);
    const supabase = createSupabaseBrowserClient();
    const { data, error: insertError } = await supabase
      .from("categories")
      .insert({
        name: newName.trim(),
        slug: slugify(newName),
        emoji: newEmoji.trim() || null,
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message.includes("duplicate")
        ? "A category with that name already exists."
        : insertError.message);
    } else if (data) {
      setCategories((prev) => [...prev, data as Category].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName("");
      setNewEmoji("");
    }
    setAdding(false);
  }

  function updateLocal(id: string, field: "name" | "emoji", value: string) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  async function handleSave(category: Category) {
    setBusyId(category.id);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase
      .from("categories")
      .update({
        name: category.name,
        slug: slugify(category.name),
        emoji: category.emoji,
      })
      .eq("id", category.id);

    if (updateError) setError(updateError.message);
    setBusyId(null);
  }

  async function handleDelete(category: Category) {
    const confirmed = window.confirm(
      `Delete "${category.name}"? Products in this category will become uncategorized, not deleted.`
    );
    if (!confirmed) return;

    setBusyId(category.id);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error: deleteError } = await supabase
      .from("categories")
      .delete()
      .eq("id", category.id);

    if (deleteError) {
      setError(deleteError.message);
      setBusyId(null);
    } else {
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleAdd}
        className="flex flex-wrap items-end gap-3 rounded-card bg-white p-6 shadow-card"
      >
        <div className="w-20">
          <label className="text-sm font-medium text-charcoal">Emoji</label>
          <input
            type="text"
            value={newEmoji}
            onChange={(e) => setNewEmoji(e.target.value)}
            placeholder="🎁"
            className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-3 py-2.5 text-center text-sm outline-none focus:border-forest"
          />
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="text-sm font-medium text-charcoal">Category Name</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Anniversary Gifts"
            className="mt-1.5 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-forest"
          />
        </div>
        <button
          type="submit"
          disabled={adding}
          className="flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-ivory hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </form>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      <div className="rounded-card bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-charcoal/10 text-charcoal-soft">
              <th className="w-20 px-6 py-3 font-medium">Emoji</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className={cn(
                  "border-b border-charcoal/5 last:border-0",
                  busyId === category.id && "opacity-50"
                )}
              >
                <td className="px-6 py-3">
                  <input
                    type="text"
                    value={category.emoji ?? ""}
                    onChange={(e) => updateLocal(category.id, "emoji", e.target.value)}
                    className="w-14 rounded-lg border border-charcoal/15 px-2 py-1.5 text-center outline-none focus:border-forest"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => updateLocal(category.id, "name", e.target.value)}
                    className="w-full rounded-lg border border-charcoal/15 px-3 py-1.5 outline-none focus:border-forest"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      aria-label={`Save ${category.name}`}
                      disabled={busyId === category.id}
                      onClick={() => handleSave(category)}
                      className="p-1 text-charcoal-soft hover:text-forest"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${category.name}`}
                      disabled={busyId === category.id}
                      onClick={() => handleDelete(category)}
                      className="p-1 text-charcoal-soft hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
