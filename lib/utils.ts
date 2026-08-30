import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a number as Nigerian Naira, e.g. 45000 -> "₦45,000" */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

/** Converts "Fresh Rose Bouquet" -> "fresh-rose-bouquet" for use as a URL slug. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** A small curated pastel palette so placeholder product tiles feel varied and lively
 *  instead of one flat beige box everywhere, until real photos are uploaded. */
const PLACEHOLDER_PALETTE = [
  { bg: "#F6E4D8", icon: "#C17A4E" }, // peach
  { bg: "#E3EDE1", icon: "#4C7A5C" }, // sage
  { bg: "#FBE8EE", icon: "#C4547A" }, // blush
  { bg: "#E7EBF7", icon: "#5A6FB0" }, // periwinkle
  { bg: "#FCEFD0", icon: "#B98A2A" }, // buttery gold
  { bg: "#E9E4F5", icon: "#7B5EA8" }, // lilac
];

/** Deterministically picks a palette entry from any id/string, so the same
 *  product always gets the same color (no flicker on re-render). */
export function placeholderColorFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return PLACEHOLDER_PALETTE[hash % PLACEHOLDER_PALETTE.length];
}
