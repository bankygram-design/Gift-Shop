import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Be Right Back",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory px-6 text-center">
      <div className="max-w-md">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass">
          Be right back
        </p>
        <h1 className="mt-4 font-display text-4xl italic text-charcoal sm:text-5xl">
          We&apos;re updating the store
        </h1>
        <p className="mt-6 text-base text-charcoal-soft">
          Our shop is temporarily unavailable while we make some improvements.
          Please check back shortly. Thank you for your patience.
        </p>
      </div>
    </main>
  );
}
