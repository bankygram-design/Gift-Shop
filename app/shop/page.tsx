import { Suspense } from "react";
import type { Metadata } from "next";
import { PackageSearch } from "lucide-react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import { getCategories, getProducts } from "@/lib/products";

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { category, q } = await searchParams;

  if (q) {
    return { title: `Search results for "${q}"` };
  }
  if (category) {
    const categories = await getCategories();
    const match = categories.find((c) => c.slug === category);
    if (match) {
      return {
        title: `${match.name} Gifts`,
        description: `Shop ${match.name.toLowerCase()} gifts, thoughtfully curated and delivered via WhatsApp ordering.`,
      };
    }
  }
  return {
    title: "Shop All Gifts",
    description: "Browse the full collection of curated gifts, ready to order via WhatsApp.",
  };
}

export default async function ShopPage({ searchParams }: PageProps) {
  const { category, q } = await searchParams;
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const activeCategory = category
    ? categories.find((c) => c.slug === category)
    : null;

  let products = allProducts;
  if (activeCategory) {
    products = products.filter((p) => p.category_id === activeCategory.id);
  }
  if (q) {
    const query = q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  return (
    <>
      <ScrollProgressBar />
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-display text-3xl italic text-charcoal">
          {activeCategory ? `${activeCategory.emoji} ${activeCategory.name}` : "All Gifts"}
        </h1>

        <div className="mt-6">
          <Suspense fallback={null}>
            <ShopFilters categories={categories} />
          </Suspense>
        </div>

        {products.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <PackageSearch className="h-10 w-10 text-brass" strokeWidth={1.5} />
            <p className="text-charcoal-soft">
              {q
                ? `No gifts found for "${q}".`
                : "No gifts found in this category yet."}
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
