const ITEMS = [
  "✨ Thoughtfully Curated Gifts",
  "💬 Order Directly via WhatsApp",
  "🚚 Nationwide Delivery",
  "🎁 Perfect for Every Occasion",
];

export default function AnnouncementBar() {
  // Duplicated so the CSS animation can loop seamlessly (-50% translate).
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden bg-charcoal py-2 text-ivory">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap motion-reduce:animate-none">
        {loop.map((item, i) => (
          <span key={i} className="font-mono text-xs uppercase tracking-[0.15em]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
