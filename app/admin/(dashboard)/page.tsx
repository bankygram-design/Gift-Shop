import Link from "next/link";
import { Package, ClipboardList } from "lucide-react";
import { getDashboardStats } from "@/lib/admin-data";
import { formatNaira } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  ready: "bg-teal-100 text-teal-700",
  delivered: "bg-green-100 text-green-700",
};

export default async function AdminDashboardPage() {
  const { productCount, orderCount, recentOrders } = await getDashboardStats();

  return (
    <div>
      <h1 className="font-display text-2xl italic text-charcoal">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-card bg-white p-6 shadow-card">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/10">
            <Package className="h-5 w-5 text-forest" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-2xl font-medium text-charcoal">{productCount}</p>
            <p className="text-sm text-charcoal-soft">Products</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-card bg-white p-6 shadow-card">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brass/15">
            <ClipboardList className="h-5 w-5 text-brass" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-2xl font-medium text-charcoal">{orderCount}</p>
            <p className="text-sm text-charcoal-soft">Orders</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-card bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg italic text-charcoal">
            Recent Orders
          </h2>
          <Link href="/admin/orders" className="text-sm text-forest hover:underline">
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="mt-6 text-sm text-charcoal-soft">No orders yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-charcoal-soft">
                  <th className="pb-2 pr-4 font-medium">Order</th>
                  <th className="pb-2 pr-4 font-medium">Customer</th>
                  <th className="pb-2 pr-4 font-medium">Total</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-charcoal/10">
                    <td className="py-3 pr-4 font-mono text-charcoal">
                      #{order.order_number}
                    </td>
                    <td className="py-3 pr-4 text-charcoal">
                      {order.customer_name}
                    </td>
                    <td className="py-3 pr-4 font-mono text-charcoal">
                      {formatNaira(order.total)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          STATUS_STYLES[order.status] ?? "bg-charcoal/10 text-charcoal"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
