import type { Category, Product } from "./types";

// Real client-confirmed categories, each with a matching emoji.
// NOTE: "Guy Gifts" - assumed this was meant instead of "Gay gifts" from the
// original message (likely a typo). Easy to rename later from the admin dashboard
// once it exists (Phase 16) if that assumption was wrong.
export const placeholderCategories: Category[] = [
  { id: "cat-1", name: "Flowers", slug: "flowers", emoji: "🌸", image_url: null, created_at: "" },
  { id: "cat-2", name: "Necklaces", slug: "necklaces", emoji: "📿", image_url: null, created_at: "" },
  { id: "cat-3", name: "Men & Women Wears", slug: "men-women-wears", emoji: "👕", image_url: null, created_at: "" },
  { id: "cat-4", name: "Customized Items", slug: "customized-items", emoji: "🎨", image_url: null, created_at: "" },
  { id: "cat-5", name: "Earrings", slug: "earrings", emoji: "💎", image_url: null, created_at: "" },
  { id: "cat-6", name: "Greeting Letters", slug: "greeting-letters", emoji: "💌", image_url: null, created_at: "" },
  { id: "cat-7", name: "Picture Frames", slug: "picture-frames", emoji: "🖼️", image_url: null, created_at: "" },
  { id: "cat-8", name: "Car Keys", slug: "car-keys", emoji: "🔑", image_url: null, created_at: "" },
  { id: "cat-9", name: "House Keys", slug: "house-keys", emoji: "🗝️", image_url: null, created_at: "" },
  { id: "cat-10", name: "Kids Toys", slug: "kids-toys", emoji: "🧸", image_url: null, created_at: "" },
  { id: "cat-11", name: "Men & Women Watches", slug: "men-women-watches", emoji: "⌚", image_url: null, created_at: "" },
  { id: "cat-12", name: "Glasses", slug: "glasses", emoji: "🕶️", image_url: null, created_at: "" },
  { id: "cat-13", name: "Belts", slug: "belts", emoji: "👖", image_url: null, created_at: "" },
  { id: "cat-14", name: "Flower Vase", slug: "flower-vase", emoji: "🏺", image_url: null, created_at: "" },
  { id: "cat-15", name: "Guy Gifts", slug: "guy-gifts", emoji: "🎁", image_url: null, created_at: "" },
  { id: "cat-16", name: "Combo Gift", slug: "combo-gift", emoji: "🎀", image_url: null, created_at: "" },
  { id: "cat-17", name: "Foods", slug: "foods", emoji: "🍰", image_url: null, created_at: "" },
  { id: "cat-18", name: "Men Accessories", slug: "men-accessories", emoji: "🧢", image_url: null, created_at: "" },
  { id: "cat-19", name: "Women Accessories", slug: "women-accessories", emoji: "👛", image_url: null, created_at: "" },
  { id: "cat-20", name: "Rings", slug: "rings", emoji: "💍", image_url: null, created_at: "" },
  { id: "cat-21", name: "House Items", slug: "house-items", emoji: "🏠", image_url: null, created_at: "" },
];

// TODO: replace with real product names, descriptions, prices, and photos.
// image_url is null on purpose - ProductCard renders a placeholder block until real photos exist.
// category_id values below match the real category list in placeholderCategories above.
export const placeholderProducts: Product[] = [
  {
    id: "prod-1",
    name: "Fresh Rose Bouquet",
    slug: "fresh-rose-bouquet",
    description: "Fresh roses arranged for a romantic gesture that speaks for itself.",
    price: 30000,
    image_url: null,
    category_id: "cat-1", // Flowers
    stock: 15,
    is_available: true,
    is_featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "prod-2",
    name: "Beaded Necklace",
    slug: "beaded-necklace",
    description: "A handcrafted beaded necklace that pairs elegance with everyday wear.",
    price: 18000,
    image_url: null,
    category_id: "cat-2", // Necklaces
    stock: 20,
    is_available: true,
    is_featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "prod-3",
    name: "Customized Photo Frame",
    slug: "customized-photo-frame",
    description: "A personalized photo frame engraved with a name or special date.",
    price: 15000,
    image_url: null,
    category_id: "cat-7", // Picture Frames
    stock: 25,
    is_available: true,
    is_featured: false,
    created_at: "",
    updated_at: "",
  },
  {
    id: "prod-4",
    name: "Customized Mug",
    slug: "customized-mug",
    description: "A printed mug personalized with a name, photo, or message.",
    price: 9000,
    image_url: null,
    category_id: "cat-4", // Customized Items
    stock: 30,
    is_available: true,
    is_featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "prod-5",
    name: "Classic Wrist Watch",
    slug: "classic-wrist-watch",
    description: "A refined wrist watch suited for both everyday wear and special occasions.",
    price: 45000,
    image_url: null,
    category_id: "cat-11", // Men & Women Watches
    stock: 10,
    is_available: true,
    is_featured: false,
    created_at: "",
    updated_at: "",
  },
  {
    id: "prod-6",
    name: "Deluxe Combo Gift Box",
    slug: "deluxe-combo-gift-box",
    description: "A curated mix of treats and keepsakes bundled into one gift box.",
    price: 55000,
    image_url: null,
    category_id: "cat-16", // Combo Gift
    stock: 8,
    is_available: true,
    is_featured: false,
    created_at: "",
    updated_at: "",
  },
];
