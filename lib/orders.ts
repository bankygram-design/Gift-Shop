import { supabase, isSupabaseConfigured } from "./supabase/client";
import { formatNaira } from "./utils";
import type { CartItem, Order, OrderItem } from "./types";

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
  country: string;
  state: string;
  city: string;
  address: string;
  deliveryInstructions?: string;
}

/**
 * Saves the order + order_items via the create_customer_order database
 * function (not a direct table insert - see database/phase23-order-privacy-hardening.sql).
 * The function generates the order_number and handles both inserts
 * atomically. product_name and price are snapshotted from the cart at
 * call time, so a later price change on the product doesn't alter
 * historical orders.
 */
export async function createOrder(
  items: CartItem[],
  customer: CustomerDetails
): Promise<{ order: Order; orderItems: OrderItem[] }> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Store is not connected to a database yet. Please contact the shop directly."
    );
  }

  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const itemsPayload = items.map((item) => ({
    product_id: item.product.id,
    product_name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const { data, error } = await supabase.rpc("create_customer_order", {
    p_customer_name: customer.name,
    p_customer_phone: customer.phone,
    p_delivery_address: customer.address,
    p_delivery_city: customer.city,
    p_delivery_state: customer.state,
    p_delivery_country: customer.country,
    p_subtotal: subtotal,
    p_items: itemsPayload,
  });

  if (error || !data || data.length === 0) {
    throw new Error(error?.message || "Could not create order");
  }

  const { order_id, order_number } = data[0] as { order_id: string; order_number: string };

  const order: Order = {
    id: order_id,
    order_number,
    customer_name: customer.name,
    customer_phone: customer.phone,
    delivery_address: customer.address,
    delivery_city: customer.city,
    delivery_state: customer.state,
    delivery_country: customer.country,
    subtotal,
    delivery_fee: null,
    total: subtotal,
    status: "pending",
    created_at: new Date().toISOString(),
  };

  const orderItems: OrderItem[] = items.map((item, i) => ({
    id: `local-${i}`,
    order_id,
    product_id: item.product.id,
    product_name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
  }));

  return { order, orderItems };
}

/** Builds the WhatsApp order message in the exact format agreed with the client. */
export function buildOrderMessage(
  order: Order,
  items: CartItem[],
  customer: CustomerDetails
): string {
  const lines: string[] = [];
  lines.push("Hello! I'd like to place an order.");
  lines.push("");
  lines.push(`Order #${order.order_number}`);
  lines.push("");

  for (const item of items) {
    const priceLabel =
      item.quantity > 1
        ? `${formatNaira(item.product.price)} each`
        : formatNaira(item.product.price);
    lines.push(`${item.quantity} x ${item.product.name} — ${priceLabel}`);
  }

  lines.push("");
  lines.push(`Subtotal: ${formatNaira(order.subtotal)}`);
  lines.push("");
  lines.push("Customer:");
  lines.push(`Name: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  lines.push(
    `Delivery location: ${customer.address}, ${customer.city}, ${customer.state}, ${customer.country}`
  );
  if (customer.deliveryInstructions) {
    lines.push(`Delivery instructions: ${customer.deliveryInstructions}`);
  }
  lines.push("");
  if (customer.country !== "Nigeria") {
    lines.push(
      "This is an international order - please confirm international shipping cost, delivery timeline, and payment details."
    );
  } else {
    lines.push("Please confirm the total delivery fee and payment details.");
  }
  lines.push("");
  lines.push("Thank you.");

  return lines.join("\n");
}

/**
 * Fetches an order + its items by order_number, via the get_order_by_number
 * database function (not a direct table select - see phase23-order-privacy-hardening.sql).
 * Used for the guest order confirmation page.
 */
export async function getOrderByNumber(
  orderNumber: string
): Promise<{ order: Order; orderItems: OrderItem[] } | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase.rpc("get_order_by_number", {
    p_order_number: orderNumber,
  });

  if (error || !data) return null;

  const { items, ...orderFields } = data as Order & { items: OrderItem[] };
  return { order: orderFields as Order, orderItems: items ?? [] };
}