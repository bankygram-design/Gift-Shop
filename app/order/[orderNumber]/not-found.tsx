import Link from "next/link";
import { PackageX } from "lucide-react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

export default function OrderNotFound() {
  return (
    <>
      <ScrollProgressBar />
      <AnnouncementBar />
      <Header />
      <main className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <PackageX className="h-10 w-10 text-brass" strokeWidth={1.5} />
        <h1 className="font-display text-2xl italic text-charcoal">
          We couldn't find that order
        </h1>
        <p className="text-charcoal-soft">
          Double check the link, or contact us directly on WhatsApp if you need help.
        </p>
        <Link
          href="/shop"
          className="mt-2 rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-ivory hover:bg-forest-dark"
        >
          Browse All Gifts
        </Link>
      </main>
      <Footer />
    </>
  );
}
