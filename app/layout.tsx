import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { StoreSettingsProvider } from "@/lib/store-settings-context";
import { getStoreSettings } from "@/lib/store-settings";

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

import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BYSIMON GIFTS | Thoughtfully Curated Gifts",
    template: "%s | BYSIMON GIFTS",
  },
  description:
    "Thoughtfully curated gifts for birthdays, anniversaries, weddings and unforgettable moments. Order easily via WhatsApp.",
  keywords: [
    "gift shop Nigeria",
    "gifts Lagos",
    "flowers Nigeria",
    "customized gifts",
    "WhatsApp gift shop",
    "BYSIMON GIFTS",
  ],
  openGraph: {
    title: "BYSIMON GIFTS | Thoughtfully Curated Gifts",
    description:
      "Thoughtfully curated gifts for birthdays, anniversaries, weddings and unforgettable moments.",
    type: "website",
    siteName: "BYSIMON GIFTS",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeSettings = await getStoreSettings();

  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-body antialiased bg-ivory text-charcoal`}
      >
        <StoreSettingsProvider settings={storeSettings}>
          <CartProvider>{children}</CartProvider>
        </StoreSettingsProvider>
      </body>
    </html>
  );
}
