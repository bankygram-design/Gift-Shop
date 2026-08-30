import Link from "next/link";
import { Gift, Truck, ShieldCheck, MessageCircle, Sparkles, BadgeCheck, Heart } from "lucide-react";
import Header from "@/components/Header";
import HeroVisual from "@/components/HeroVisual";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import HeroParallaxBackground from "@/components/HeroParallaxBackground";
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
      <ScrollProgressBar />
      <AnnouncementBar />
      <Header />

      <main>
        {/* HERO */}
        <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-28 sm:pt-24">
          <HeroParallaxBackground />
          <div className="grid items-center gap-10 sm:grid-cols-2 sm:gap-16">
            <div>
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-brass">
                <Sparkles className="h-3.5 w-3.5" /> Curated Gifting, 2026 Collection
              </p>
              <h1 className="mt-5 font-display text-5xl italic leading-[1.05] text-charcoal sm:text-6xl lg:text-7xl">
                {siteConfig.tagline}
              </h1>
              <p className="mt-6 max-w-md text-base text-charcoal-soft sm:text-lg">
                {siteConfig.description}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="group flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-medium text-ivory shadow-[0_8px_30px_-8px_rgba(44,74,59,0.5)] transition-all hover:bg-forest-dark hover:shadow-[0_12px_36px_-8px_rgba(44,74,59,0.6)]"
                >
                  Shop Gifts
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/shop?category=combo-gift"
                  className="rounded-full border border-charcoal/20 px-8 py-3.5 text-sm font-medium text-charcoal backdrop-blur-sm transition-colors hover:border-forest hover:text-forest"
                >
                  Explore Combo Gifts
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-charcoal/10 pt-6">
                <div className="flex items-center gap-2 text-xs text-charcoal-soft">
                  <BadgeCheck className="h-4 w-4 text-forest" />
                  Secure Ordering
                </div>
                <div className="flex items-center gap-2 text-xs text-charcoal-soft">
                  <MessageCircle className="h-4 w-4 text-forest" />
                  WhatsApp Verified
                </div>
                <div className="flex items-center gap-2 text-xs text-charcoal-soft">
                  <Heart className="h-4 w-4 text-forest" />
                  Nationwide Delivery
                </div>
              </div>
            </div>

            <HeroVisual />
          </div>
        </section>

        {/* CATEGORIES */}
        <Reveal>
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass">Browse</p>
          <h2 className="mt-2 font-display text-2xl italic text-charcoal sm:text-3xl">
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
        </Reveal>

        {/* FEATURED GIFTS */}
        <Reveal>
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass">Handpicked</p>
              <h2 className="mt-2 font-display text-2xl italic text-charcoal sm:text-3xl">
                Featured Gifts
              </h2>
            </div>
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
        </Reveal>

        {/* BEST SELLERS */}
        <Reveal>
        <section className="bg-gradient-to-b from-transparent via-brass/[0.04] to-transparent py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass">Most Loved</p>
          <h2 className="mt-2 font-display text-2xl italic text-charcoal sm:text-3xl">
            Best Sellers
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        </section>
        </Reveal>

        {/* WHY CHOOSE US */}
        <Reveal>
        <section className="bg-ivory-dim py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass">The Difference</p>
            <h2 className="mt-2 font-display text-2xl italic text-charcoal sm:text-3xl">
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
        </Reveal>

        {/* CTA */}
        <Reveal>
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
        </Reveal>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}