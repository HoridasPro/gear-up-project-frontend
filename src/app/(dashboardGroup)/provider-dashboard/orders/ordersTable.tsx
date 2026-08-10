"use client";

import Image from "next/image";
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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-3 text-left">SI</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Customer Name</th>
            <th className="p-3 text-left">Order Name</th>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-center">Quantity</th>
            <th className="p-3 text-center">Start Date</th>
            <th className="p-3 text-center">End Date</th>
            <th className="p-3 text-center">Total Price</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className="border-t">
              {/* SI */}
              <td className="p-3">{index + 1}</td>

              {/* Image */}
              <td className="p-3 h-12 w-12">
                {order.gearItem?.gearItemImage ? (
                  <Image
                    src={order.gearItem.gearItemImage}
                    alt={order.gearItem.title || "Gear"}
                    width={50}
                    height={50}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </td>
              <td className="p-3">
                <div>
                  <p className="font-medium">{order.customer.name}</p>

                  <p className="text-xs text-muted-foreground">
                    {order.customer.email}
                  </p>
                </div>
              </td>

              <td className="p-3 text-center">{order.gearItem.title}</td>
              {/* Order ID */}
              <td className="p-3">{order.id}</td>

              {/* Customer Name + Email */}

              {/* Gear Name */}

              {/* Quantity */}
              <td className="p-3 text-center">{order.quantity}</td>

              {/* Start Date */}
              <td className="p-3 text-center">
                {new Date(order.startDate).toLocaleDateString()}
              </td>

              {/* End Date */}
              <td className="p-3 text-center">
                {new Date(order.endDate).toLocaleDateString()}
              </td>

              {/* Total Price */}
              <td className="p-3 text-center">৳ {order.totalPrice}</td>

              {/* Action */}
              <td className="p-3">
                <select
                  defaultValue={order.status}
                  onChange={(e) => handleUpdate(order.id, e.target.value)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    order.status === "PENDING"
                      ? "border-yellow-400 bg-yellow-100 text-yellow-700"
                      : order.status === "PICKEDUP"
                        ? "border-green-400 bg-green-100 text-green-700"
                        : "border-purple-400 bg-purple-100 text-purple-700"
                  }`}
                >
                  <option value="PENDING" className="text-yellow-700">
                    PENDING
                  </option>

                  <option value="PICKEDUP" className="text-green-700">
                    PICKED UP
                  </option>

                  <option value="RETURNED" className="text-purple-700">
                    RETURNED
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
