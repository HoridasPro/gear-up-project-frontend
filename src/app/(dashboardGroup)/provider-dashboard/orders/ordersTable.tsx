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
    <div className="w-full overflow-hidden rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 shadow-2xl backdrop-blur-xl">
      <table className="w-full border-collapse text-left table-fixed">
        <thead className="border-b border-gray-800/80 bg-gray-900/60 text-[10px] sm:text-xs uppercase tracking-wider text-gray-400">
          <tr>
            <th className="w-[5%] p-2 sm:p-3 font-semibold text-left">SI</th>
            <th className="w-[8%] p-2 sm:p-3 font-semibold text-left hidden sm:table-cell">
              Image
            </th>
            <th className="w-[20%] sm:w-[15%] p-2 sm:p-3 font-semibold text-left">
              Customer Name
            </th>
            <th className="w-[20%] sm:w-[15%] p-2 sm:p-3 font-semibold text-left">
              Order Name
            </th>
            <th className="w-[12%] p-2 sm:p-3 font-semibold text-left hidden lg:table-cell">
              Order ID
            </th>
            <th className="w-[8%] sm:w-[6%] p-2 sm:p-3 font-semibold text-center">
              Qty
            </th>
            <th className="w-[10%] p-2 sm:p-3 font-semibold text-center hidden md:table-cell">
              Start Date
            </th>
            <th className="w-[10%] p-2 sm:p-3 font-semibold text-center hidden md:table-cell">
              End Date
            </th>
            <th className="w-[15%] sm:w-[10%] p-2 sm:p-3 font-semibold text-center">
              Total Price
            </th>
            <th className="w-[18%] sm:w-[12%] p-2 sm:p-3 font-semibold text-center">
              Status
            </th>
            <th className="w-[18%] sm:w-[12%] p-2 sm:p-3 font-semibold text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800/60 text-[11px] sm:text-xs lg:text-sm">
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className="transition-colors hover:bg-gray-800/40"
            >
              {/* SI */}
              <td className="p-2 sm:p-3 font-medium text-gray-400">
                {index + 1}
              </td>

              {/* Image */}
              <td className="p-2 sm:p-3 hidden sm:table-cell">
                <div className="relative h-9 w-9 lg:h-11 lg:w-11 overflow-hidden rounded-lg border border-gray-800 bg-gray-900/80 shadow-md shrink-0">
                  {order.gearItem?.gearItemImage ? (
                    <Image
                      src={order.gearItem.gearItemImage}
                      alt={order.gearItem.title || "Gear"}
                      width={50}
                      height={50}
                      className="h-full w-full rounded-lg object-cover transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-900/80 text-[9px] text-gray-500 font-medium">
                      No Image
                    </div>
                  )}
                </div>
              </td>

              {/* Customer Name + Email */}
              <td className="p-2 sm:p-3 truncate">
                <div>
                  <p className="font-semibold text-white truncate">
                    {order.customer.name}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate">
                    {order.customer.email}
                  </p>
                </div>
              </td>

              {/* Order Name */}
              <td className="p-2 sm:p-3 font-medium text-gray-200 truncate">
                {order.gearItem.title}
              </td>

              {/* Order ID */}
              <td className="p-2 sm:p-3 font-mono text-[10px] text-gray-400 truncate hidden lg:table-cell">
                {order.id}
              </td>

              {/* Quantity */}
              <td className="p-2 sm:p-3 text-center">
                <span className="inline-flex items-center justify-center min-w-5 px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-gray-800/80 border border-gray-700 text-gray-200">
                  {order.quantity}
                </span>
              </td>

              {/* Start Date */}
              <td className="p-2 sm:p-3 text-center text-gray-300 text-[10px] sm:text-xs hidden md:table-cell truncate">
                {new Date(order.startDate).toLocaleDateString()}
              </td>

              {/* End Date */}
              <td className="p-2 sm:p-3 text-center text-gray-300 text-[10px] sm:text-xs hidden md:table-cell truncate">
                {new Date(order.endDate).toLocaleDateString()}
              </td>

              {/* Total Price */}
              <td className="p-2 sm:p-3 text-center font-bold text-emerald-400 truncate">
                ৳ {order.totalPrice}
              </td>
              {/* Status */}
              {/* <td className="p-2 sm:p-3 text-center font-bold text-emerald-400 truncate">
                ৳ {order.status}
              </td> */}
              {/* Status */}
              <td className="p-2 sm:p-3 text-center font-bold truncate">
                <span
                  className={`inline-block rounded-full border px-2 py-1 text-[10px] sm:text-xs font-semibold ${
                    order.status === "PLACED"
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                      : order.status === "CONFIRMED"
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                        : order.status === "PAID"
                          ? "border-purple-500/30 bg-purple-500/10 text-purple-400"
                          : order.status === "PICKEDUP"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : order.status === "RETURNED"
                              ? "border-gray-500/30 bg-gray-500/10 text-gray-400"
                              : order.status === "CANCELLED"
                                ? "border-red-500/30 bg-red-500/10 text-red-400"
                                : "border-gray-500/30 bg-gray-500/10 text-gray-400"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              {/* Action */}
              {/* <td className="p-2 sm:p-3 text-center">
                <select
                  defaultValue={order.status}
                  onChange={(e) => handleUpdate(order.id, e.target.value)}
                  className={`w-full cursor-pointer rounded-full border px-1.5 py-1 text-[10px] sm:text-xs font-semibold outline-none transition-all duration-200 shadow-sm  text-center ${
                    order.status === "PLACED"
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-400 focus:border-amber-500"
                      : order.status === "PICKEDUP"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 focus:border-emerald-500"
                        : order.status === "CONFIRMED"
                          ? "border-blue-500/30 bg-blue-500/10 text-blue-400 focus:border-blue-500"
                          : order.status === "RETURNED"
                            ? "border-gray-500/30 bg-gray-500/10 text-gray-400 focus:border-gray-500"
                            : order.status === "CANCELLED"
                              ? "border-red-500/30 bg-red-500/10 text-red-400 focus:border-gray-500"
                              : "border-purple-500/30 bg-purple-500/10 text-purple-400 focus:border-purple-500"
                  }`}
                >
                  <option
                    value="PLACED"
                    className="bg-gray-900 text-amber-400 font-medium"
                  >
                    PLACED
                  </option>

                  <option
                    value="PICKEDUP"
                    className="bg-gray-900 text-emerald-400 font-medium"
                  >
                    PICKED UP
                  </option>
                  <option
                    value="CONFIRMED"
                    className="bg-gray-900 text-emerald-400 font-medium"
                  >
                    CONFIRMED
                  </option>

                  <option
                    value="RETURNED"
                    className="bg-gray-900 text-purple-400 font-medium"
                  >
                    RETURNED
                  </option>
                  <option
                    value="CANCELLED"
                    className="bg-gray-900 text-purple-400 font-medium"
                  >
                    CANCELLED
                  </option>
                </select>
              </td> */}

              {/* Action */}
              <td className="p-2 sm:p-3 text-center">
                {order.status === "CANCELLED" ? (
                  <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-2 py-1 text-[10px] sm:text-xs font-semibold text-red-400">
                    Cancelled
                  </span>
                ) : (
                  <select
                    defaultValue={order.status}
                    onChange={(e) => handleUpdate(order.id, e.target.value)}
                    className={`w-full cursor-pointer rounded-full border px-1.5 py-1 text-[10px] sm:text-xs font-semibold outline-none transition-all duration-200 shadow-sm text-center ${
                      order.status === "PLACED"
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-400 focus:border-amber-500"
                        : order.status === "PICKEDUP"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 focus:border-emerald-500"
                          : order.status === "CONFIRMED"
                            ? "border-blue-500/30 bg-blue-500/10 text-blue-400 focus:border-blue-500"
                            : order.status === "RETURNED"
                              ? "border-gray-500/30 bg-gray-500/10 text-gray-400 focus:border-gray-500"
                              : "border-purple-500/30 bg-purple-500/10 text-purple-400 focus:border-purple-500"
                    }`}
                  >
                    <option
                      value="PLACED"
                      className="bg-gray-900 text-amber-400 font-medium"
                    >
                      PLACED
                    </option>

                    <option
                      value="CONFIRMED"
                      className="bg-gray-900 text-blue-400 font-medium"
                    >
                      CONFIRMED
                    </option>

                    <option
                      value="PICKEDUP"
                      className="bg-gray-900 text-emerald-400 font-medium"
                    >
                      PICKED UP
                    </option>

                    <option
                      value="RETURNED"
                      className="bg-gray-900 text-gray-400 font-medium"
                    >
                      RETURNED
                    </option>

                    <option
                      value="CANCELLED"
                      className="bg-gray-900 text-red-400 font-medium"
                    >
                      CANCELLED
                    </option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
