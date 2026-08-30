"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useStoreSettings } from "@/lib/store-settings-context";

export default function WhatsAppButton() {
  const { whatsappNumber } = useStoreSettings();

  return (
    <a
      href={buildWhatsAppLink(whatsappNumber, "Hi! I'd like to ask about your gifts.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-ivory shadow-card transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} />
    </a>
  );
}
