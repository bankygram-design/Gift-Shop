import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Gift } from "lucide-react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductDetailActions from "@/components/ProductDetailActions";
import { getProductBySlug } from "@/lib/products";
import { formatNaira, placeholderColorFor } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image_url ? [product.image_url] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ScrollProgressBar />
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-14">
          <div
            className="flex aspect-square items-center justify-center overflow-hidden rounded-card"
            style={{
              backgroundColor: product.image_url
                ? undefined
                : placeholderColorFor(product.id).bg,
            }}
          >
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Gift
                className="h-16 w-16"
                strokeWidth={1.25}
                style={{ color: placeholderColorFor(product.id).icon }}
              />
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h1 className="font-display text-3xl italic leading-tight text-charcoal sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 font-mono text-xl text-forest-dark">
                {formatNaira(product.price)}
              </p>
            </div>

            <p className="text-charcoal-soft">{product.description}</p>

            <p
              className={`text-sm font-medium ${
                product.is_available ? "text-forest" : "text-red-600"
              }`}
            >
              {product.is_available ? "In Stock" : "Currently Unavailable"}
            </p>

            <ProductDetailActions product={product} />
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
