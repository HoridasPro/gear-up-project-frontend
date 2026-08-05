"use client";

import { RentalGear } from "@/type/type-gear";
import { toast } from "sonner";
import { updateOrderStatus } from "../../_actions/update-status";

type Props = {
  orders: RentalGear[];
};

export default function OrdersTable({ orders }: Props) {
  const handleUpdate = async (id: string, status: string) => {
    const result = await updateOrderStatus(id, status);

    if (result.success) {
      toast.success("Order updated successfully");
      window.location.reload();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Order ID</th>
            <th className="p-3">Gear ID</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Total Price</th>
            <th className="p-3">Status</th>
            <th className="p-3">Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-3">{order.id}</td>

              {/* <td className="p-3">{order.}</td> */}

              <td className="p-3 text-center">{order.quantity}</td>

              <td className="p-3 text-center">৳ {order.totalPrice}</td>

              {/* <td className="p-3 text-center">{order.}</td> */}

              <td className="p-3">
                <select
                  defaultValue={order.status}
                  onChange={(e) => handleUpdate(order.id, e.target.value)}
                  className="rounded border px-2 py-1"
                >
                  <option value="PENDING">PENDING</option>

                  <option value="APPROVED">APPROVED</option>

                  <option value="RETURNED">RETURNED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
