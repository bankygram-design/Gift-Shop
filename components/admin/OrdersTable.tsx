"use client";

import { useState, Fragment } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { formatNaira, cn } from "@/lib/utils";
import type { Order, OrderItem, OrderStatus } from "@/lib/types";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "paid",
  "processing",
  "ready",
  "delivered",
];

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  ready: "bg-teal-100 text-teal-700",
  delivered: "bg-green-100 text-green-700",
};

export default function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [itemsByOrder, setItemsByOrder] = useState<Record<string, OrderItem[]>>({});
  const [loadingItems, setLoadingItems] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function toggleExpand(order: Order) {
    if (expandedId === order.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(order.id);

    if (!itemsByOrder[order.id]) {
      setLoadingItems(order.id);
      const supabase = createSupabaseBrowserClient();
      const { data, error: fetchError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);

      if (!fetchError && data) {
        setItemsByOrder((prev) => ({ ...prev, [order.id]: data as OrderItem[] }));
      }
      setLoadingItems(null);
    }
  }

  async function handleStatusChange(order: Order, newStatus: OrderStatus) {
    setBusyId(order.id);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", order.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
      );
    }
    setBusyId(null);
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-card bg-white p-8 text-center text-sm text-charcoal-soft shadow-card">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="rounded-card bg-white shadow-card">
      {error && (
        <p className="border-b border-charcoal/10 bg-red-50 px-6 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-charcoal/10 text-charcoal-soft">
              <th className="w-8 px-6 py-3"></th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <Fragment key={order.id}>
                <tr
                  className={cn(
                    "cursor-pointer border-b border-charcoal/5 hover:bg-ivory-dim/50",
                    busyId === order.id && "opacity-50"
                  )}
                  onClick={() => toggleExpand(order)}
                >
                  <td className="px-6 py-3 text-charcoal-soft">
                    {expandedId === order.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-charcoal">
                    #{order.order_number}
                  </td>
                  <td className="px-4 py-3 text-charcoal">
                    <div className="flex items-center gap-2">
                      {order.customer_name}
                      {order.delivery_country && order.delivery_country !== "Nigeria" && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                          🌍 {order.delivery_country}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-charcoal-soft">{order.customer_phone}</td>
                  <td className="px-4 py-3 font-mono text-charcoal">
                    {formatNaira(order.total)}
                  </td>
                  <td className="px-4 py-3 text-charcoal-soft">
                    {new Date(order.created_at).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={order.status}
                      disabled={busyId === order.id}
                      onChange={(e) =>
                        handleStatusChange(order, e.target.value as OrderStatus)
                      }
                      className={cn(
                        "rounded-full border-0 px-3 py-1 text-xs font-medium capitalize outline-none",
                        STATUS_STYLES[order.status]
                      )}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                {expandedId === order.id && (
                  <tr className="border-b border-charcoal/5 bg-ivory-dim/40">
                    <td colSpan={7} className="px-6 py-4">
                      {loadingItems === order.id ? (
                        <p className="text-sm text-charcoal-soft">Loading items...</p>
                      ) : (
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-charcoal-soft">
                              Items
                            </p>
                            <div className="mt-2 flex flex-col gap-1">
                              {(itemsByOrder[order.id] ?? []).map((item) => (
                                <p key={item.id} className="text-sm text-charcoal">
                                  {item.quantity} x {item.product_name} —{" "}
                                  <span className="font-mono">
                                    {formatNaira(item.price * item.quantity)}
                                  </span>
                                </p>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-charcoal-soft">
                              Delivery
                            </p>
                            <p className="mt-2 text-sm text-charcoal">
                              {order.delivery_address}, {order.delivery_city},{" "}
                              {order.delivery_state}
                              {order.delivery_country ? `, ${order.delivery_country}` : ""}
                            </p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
