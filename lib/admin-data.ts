import { createSupabaseServerClient } from "./supabase/server";
import type { Order } from "./types";

export interface DashboardStats {
  productCount: number;
  orderCount: number;
  recentOrders: Order[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createSupabaseServerClient();

  const [productsResult, ordersResult, recentOrdersResult] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return {
    productCount: productsResult.count ?? 0,
    orderCount: ordersResult.count ?? 0,
    recentOrders: (recentOrdersResult.data as Order[]) ?? [],
  };
}
