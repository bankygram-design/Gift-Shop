import { createSupabaseServerClient } from "@/lib/supabase/server";
import OrdersTable from "@/components/admin/OrdersTable";
import type { Order } from "@/lib/types";

export default async function AdminOrdersPage() {
  const supabase = await createSupabaseServerClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl italic text-charcoal">Orders</h1>
      <div className="mt-6">
        <OrdersTable initialOrders={(orders as Order[]) ?? []} />
      </div>
    </div>
  );
}
