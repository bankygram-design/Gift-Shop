/**
 * Builds a wa.me click-to-chat link.
 * whatsappNumber comes from live store_settings (see useStoreSettings()),
 * not a hardcoded value, so the owner can change it from the admin
 * dashboard without any code changes.
 */
export function buildWhatsAppLink(whatsappNumber: string, message?: string): string {
  const base = `https://wa.me/${whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
