"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  ClipboardList,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({
  variant = "vertical",
}: {
  variant?: "vertical" | "horizontal";
}) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        variant === "vertical"
          ? "flex flex-col gap-2 p-4"
          : "flex w-max gap-2"
      )}
    >
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "neu-pressed text-forest"
                : "neu-raised text-charcoal-soft hover:text-forest"
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}