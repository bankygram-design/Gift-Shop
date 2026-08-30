import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "BYSIMON GIFTS | Thoughtfully Curated Gifts",
    template: "%s | BYSIMON GIFTS",
  },
  description:
    "Thoughtfully curated gifts for birthdays, anniversaries, weddings and unforgettable moments. Order easily via WhatsApp.",
  openGraph: {
    title: "BYSIMON GIFTS | Thoughtfully Curated Gifts",
    description:
      "Thoughtfully curated gifts for birthdays, anniversaries, weddings and unforgettable moments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-body antialiased bg-ivory text-charcoal`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
