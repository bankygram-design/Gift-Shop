import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getOrderByNumber } from "@/lib/orders";
import { formatNaira } from "@/lib/utils";

interface PageProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderConfirmationPage({ params }: PageProps) {
  const { orderNumber } = await params;
  const result = await getOrderByNumber(orderNumber);

  if (!result) {
    notFound();
  }

  const { order, orderItems } = result;

  return (
    <>
      <ScrollProgressBar />
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="h-12 w-12 text-forest" strokeWidth={1.5} />
          <h1 className="mt-4 font-display text-3xl italic text-charcoal">
            Order Placed
          </h1>
          <p className="mt-2 text-charcoal-soft">
            Order <span className="font-mono text-charcoal">#{order.order_number}</span> has
            been received. We've opened WhatsApp so you can confirm delivery fee and payment
            with us directly.
          </p>
        </div>

        <div className="mt-10 rounded-card bg-ivory-dim p-6">
          <h2 className="font-display text-lg italic text-charcoal">Order Details</h2>
          <div className="mt-4 flex flex-col gap-2">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-charcoal-soft">
                <span>{item.quantity} x {item.product_name}</span>
                <span className="font-mono text-charcoal">
                  {formatNaira(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-charcoal/10 pt-4 flex justify-between font-medium text-charcoal">
            <span>Subtotal</span>
            <span className="font-mono">{formatNaira(order.subtotal)}</span>
          </div>

          <div className="mt-6 border-t border-charcoal/10 pt-4 text-sm text-charcoal-soft">
            <p className="font-medium text-charcoal">Delivery to</p>
            <p className="mt-1">{order.customer_name}</p>
            <p>{order.customer_phone}</p>
            <p>
              {order.delivery_address}, {order.delivery_city}, {order.delivery_state}
              {order.delivery_country ? `, ${order.delivery_country}` : ""}
            </p>
          </div>
        </div>

        <Link
          href="/shop"
          className="mt-8 block rounded-full bg-forest px-6 py-3 text-center text-sm font-medium text-ivory hover:bg-forest-dark"
        >
          Continue Shopping
        </Link>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
