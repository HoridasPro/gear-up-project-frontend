// "use client";

// import { RentalGear } from "@/type/type-gear";
// import { toast } from "sonner";
// import { updateOrderStatus } from "../../_actions/update-status";

// type Props = {
//   orders: RentalGear[];
// };

// export default function OrdersTable({ orders }: Props) {
//   const handleUpdate = async (id: string, status: string) => {
//     const result = await updateOrderStatus(id, status);

//     if (result.success) {
//       toast.success("Order updated successfully");
//       window.location.reload();
//     } else {
//       toast.error(result.message);
//     }
//   };

//   return (
//     <div className="overflow-x-auto rounded-lg border bg-white">
//       <table className="w-full">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3">Order ID</th>
//             <th className="p-3">Customer Name</th>
//             <th className="p-3">Customer Email</th>
//             <th className="p-3">Gears Name</th>
//             <th className="p-3">Quantity</th>
//             <th className="p-3">Start Date</th>
//             <th className="p-3">End Date</th>
//             <th className="p-3">Total Price</th>
//             <th className="p-3">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id} className="border-t">
//               <td className="p-3">{order.id}</td>

//               <td className="p-3 text-center">{order.customer.name}</td>
//               <td className="p-3 text-center">{order.customer.email}</td>
//               <td className="p-3 text-center">{order.gearItem.title}</td>
//               <td className="p-3 text-center">{order.quantity}</td>
//               <td className="p-3 text-center">{order.startDate}</td>
//               <td className="p-3 text-center">{order.endDate}</td>

//               <td className="p-3 text-center">৳ {order.totalPrice}</td>

//               {/* <td className="p-3 text-center">{order.}</td> */}

//               <td className="p-3">
//                 <select
//                   defaultValue={order.status}
//                   onChange={(e) => handleUpdate(order.id, e.target.value)}
//                   className="rounded border px-2 py-1"
//                 >
//                   <option value="PENDING">PENDING</option>

//                   <option value="APPROVED">APPROVED</option>

//                   <option value="RETURNED">RETURNED</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
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
            <th className="p-3">Customer Name</th>
            <th className="p-3">Customer Email</th>
            <th className="p-3">Gears Name</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Start Date</th>
            <th className="p-3">End Date</th>
            <th className="p-3">Total Price</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-3">{order.id}</td>

              <td className="p-3 text-center">{order.customer.name}</td>

              <td className="p-3 text-center">{order.customer.email}</td>

              <td className="p-3 text-center">{order.gearItem.title}</td>

              <td className="p-3 text-center">{order.quantity}</td>

              <td className="p-3 text-center">
                {new Date(order.startDate).toLocaleDateString()}
              </td>

              <td className="p-3 text-center">
                {new Date(order.endDate).toLocaleDateString()}
              </td>

              <td className="p-3 text-center">৳ {order.totalPrice}</td>

              <td className="p-3">
                <select
                  defaultValue={order.status}
                  onChange={(e) => handleUpdate(order.id, e.target.value)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    order.status === "PENDING"
                      ? "border-yellow-400 bg-yellow-100 text-yellow-700"
                      : order.status === "APPROVED"
                        ? "border-green-400 bg-green-100 text-green-700"
                        : "border-purple-400 bg-purple-100 text-purple-700"
                  }`}
                >
                  <option value="PENDING" className="text-yellow-700">
                    PENDING
                  </option>

                  <option value="APPROVED" className="text-green-700">
                    APPROVED
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
