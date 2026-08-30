import Link from "next/link";
import { Gift } from "lucide-react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

export default function ProductNotFound() {
  return (
    <>
      <ScrollProgressBar />
      <AnnouncementBar />
      <Header />
      <main className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <Gift className="h-10 w-10 text-brass" strokeWidth={1.5} />
        <h1 className="font-display text-2xl italic text-charcoal">
          We couldn't find that gift
        </h1>
        <p className="text-charcoal-soft">
          It may have been removed or the link is out of date.
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
