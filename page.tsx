import Link from "next/link";
import { Gift, Truck, ShieldCheck, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { getCategories, getFeaturedProducts, getProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export default async function HomePage() {
  const [categories, allProducts, featured] = await Promise.all([
    getCategories(),
    getProducts(),
    getFeaturedProducts(),
  ]);
  const bestSellers = allProducts.slice(0, 4);

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
          <div className="grid items-center gap-10 sm:grid-cols-2 sm:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
                Curated Gifting
              </p>
              <h1 className="mt-4 font-display text-4xl italic leading-[1.1] text-charcoal sm:text-5xl">
                {siteConfig.tagline}
              </h1>
              <p className="mt-5 max-w-md text-charcoal-soft">
                {siteConfig.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="rounded-full bg-forest px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-forest-dark"
                >
                  Shop Gifts
                </Link>
                <Link
                  href="/shop?category=combo-gift"
                  className="rounded-full border border-charcoal/20 px-7 py-3 text-sm font-medium text-charcoal transition-colors hover:border-forest hover:text-forest"
                >
                  Explore Combo Gifts
                </Link>
              </div>
            </div>

            <div className="flex aspect-[4/5] items-center justify-center rounded-card bg-ivory-dim sm:aspect-square">
              <Gift className="h-16 w-16 text-brass" strokeWidth={1.25} />
              {/* TODO: replace with real hero photography once assets are ready */}
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="font-display text-2xl italic text-charcoal">
            Shop by Category
          </h2>
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-6 sm:overflow-visible">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-charcoal/15 px-5 py-2.5 text-sm text-charcoal-soft transition-colors hover:border-forest hover:text-forest sm:justify-self-stretch sm:text-center"
              >
                <span aria-hidden="true">{category.emoji}</span>
                {category.name}
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED GIFTS */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl italic text-charcoal">
              Featured Gifts
            </h2>
            <Link href="/shop" className="text-sm text-forest hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* BEST SELLERS */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="font-display text-2xl italic text-charcoal">
            Best Sellers
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-ivory-dim py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl italic text-charcoal">
              Why Choose Us
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              <div>
                <Gift className="h-6 w-6 text-forest" strokeWidth={1.5} />
                <p className="mt-3 font-medium text-charcoal">
                  Thoughtfully Curated
                </p>
                <p className="mt-1 text-sm text-charcoal-soft">
                  Every gift is chosen for the moment it's meant for.
                </p>
              </div>
              <div>
                <Truck className="h-6 w-6 text-forest" strokeWidth={1.5} />
                <p className="mt-3 font-medium text-charcoal">
                  Reliable Delivery
                </p>
                <p className="mt-1 text-sm text-charcoal-soft">
                  Delivered carefully, right when it needs to arrive.
                </p>
              </div>
              <div>
                <MessageCircle className="h-6 w-6 text-forest" strokeWidth={1.5} />
                <p className="mt-3 font-medium text-charcoal">
                  Easy WhatsApp Ordering
                </p>
                <p className="mt-1 text-sm text-charcoal-soft">
                  Order in a few taps, confirm details directly with us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <ShieldCheck className="mx-auto h-8 w-8 text-brass" strokeWidth={1.5} />
          <h2 className="mt-4 font-display text-3xl italic text-charcoal">
            Ready to Make Someone's Day?
          </h2>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-forest px-8 py-3 text-sm font-medium text-ivory transition-colors hover:bg-forest-dark"
          >
            Start Shopping
          </Link>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
