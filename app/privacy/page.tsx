import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Privacy Policy & Terms",
  description: "How BYSIMON GIFTS collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <ScrollProgressBar />
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="font-display text-3xl italic text-charcoal">
          Privacy Policy & Terms
        </h1>
        <p className="mt-2 text-sm text-charcoal-soft">Last updated: September 2026</p>

        <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-charcoal-soft">
          <section>
            <h2 className="font-display text-lg italic text-charcoal">
              What Information We Collect
            </h2>
            <p className="mt-2">
              When you place an order, we collect your name, phone number, delivery
              address (including city, state, and country), and optionally your
              email address. We also keep a record of what you ordered, the price
              at the time of your order, and the date.
            </p>
            <p className="mt-2">
              We do not collect or store any payment card details. Payment is
              arranged directly with you over WhatsApp, and we never see or keep
              your card or bank information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg italic text-charcoal">
              How We Use Your Information
            </h2>
            <p className="mt-2">
              We use your information only to process and deliver your order,
              confirm delivery costs and timing with you, and contact you about
              that order. We do not sell your information to third parties, and we
              do not use it for marketing without your consent.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg italic text-charcoal">
              How Your Information Is Stored
            </h2>
            <p className="mt-2">
              Order information is stored securely using Supabase, a
              database provider with industry-standard security practices. Your
              shopping cart, before checkout, is stored only in your own browser
              (not on our servers) and is cleared once your order is placed.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg italic text-charcoal">
              WhatsApp Ordering
            </h2>
            <p className="mt-2">
              When you check out, a WhatsApp message is prepared with your order
              details so you can send it to us directly. This opens WhatsApp on
              your device — we don't automatically send anything without you
              choosing to. Message content shared over WhatsApp is subject to
              WhatsApp's own privacy policy, not ours.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg italic text-charcoal">
              International Orders
            </h2>
            <p className="mt-2">
              For orders delivered outside Nigeria, shipping cost, delivery
              timeline, and any customs duties or import taxes are confirmed with
              you individually over WhatsApp before your order is dispatched. Any
              customs or import fees charged by your country are your
              responsibility.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg italic text-charcoal">
              Returns & Order Changes
            </h2>
            <p className="mt-2">
              For questions about returns, exchanges, or changes to an order
              already placed, please contact us directly on WhatsApp with your
              order number. We'll work with you to resolve it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg italic text-charcoal">
              Your Rights
            </h2>
            <p className="mt-2">
              You can ask us at any time what information we hold about you, or
              request that we delete it, by contacting us on WhatsApp. We'll
              keep basic order records as needed for our own accounting, but will
              remove anything else on request.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg italic text-charcoal">
              Contact Us
            </h2>
            <p className="mt-2">
              If you have any questions about this policy or how your information
              is handled, message us on WhatsApp using the button on this page.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}