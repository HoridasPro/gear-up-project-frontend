// "use client";

// import { RentalGear } from "@/type/type-gear";
// import { toast } from "sonner";
// import { updateOrderStatus } from "../../_actions/get-order-status";

// type Props = {
//   orders: RentalGear[];
// };

// export default function OrdersTable({ orders }: Props) {
//   console.log("Orders =", orders);
//   const handleUpdate = async (id: string, status: string) => {
//     try {
//       const result = await updateOrderStatus(id, status);

//       if (result?.success) {
//         toast.success("Order status updated successfully.");
//         window.location.reload();
//       } else {
//         toast.error(result?.message || "Failed to update order status.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong!");
//     }
//   };

//   return (
//     <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
//       <table className="w-full">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-3 text-left">Order ID</th>
//             <th className="px-4 py-3 text-left">Gear ID</th>
//             <th className="px-4 py-3 text-center">Qty</th>
//             <th className="px-4 py-3 text-center">Total</th>
//             <th className="px-4 py-3 text-center">Status</th>
//             <th className="px-4 py-3 text-center">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id} className="border-t">
//               <td className="px-4 py-3 font-mono text-xs">
//                 {order.id.slice(0, 10)}...
//               </td>

//               <td className="px-4 py-3 font-mono text-xs">
//                 {order.gearItemId.slice(0, 10)}...
//               </td>

//               <td className="px-4 py-3 text-center">{order.quantity}</td>

//               <td className="px-4 py-3 text-center">৳ {order.totalPrice}</td>

//               <td className="px-4 py-3 text-center">
//                 <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
//                   {order.status}
//                 </span>
//               </td>

//               <td className="px-4 py-3 text-center">
//                 <select
//                   defaultValue={order.status}
//                   onChange={(e) => handleUpdate(order.id, e.target.value)}
//                   className="rounded-md border px-2 py-1"
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
