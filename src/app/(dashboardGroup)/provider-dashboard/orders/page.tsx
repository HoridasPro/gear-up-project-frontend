import { RentalResponse } from "@/type/type-gear";
import { getProviderOrders } from "../../_actions/get-provider-orders";
import OrdersTable from "./ordersTable";

export default async function OrdersPage() {
  const result: RentalResponse = await getProviderOrders();
  console.log("get result", result);

  const orders = result?.data || [];
  console.log("get orders", orders);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage incoming rental orders</p>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}
