// /* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import { useState } from "react";
// // import ReviewModal from "./reviewModal";
// // // import ReviewModal from "./ReviewModal";

// // export default function CustomerOrdersTable({ orders }: { orders: any[] }) {
// //   const [selectedOrder, setSelectedOrder] = useState<{
// //     id: string;
// //     title: string;
// //   } | null>(null);

// //   return (
// //     <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
// //       <table className="w-full text-left text-sm">
// //         <thead className="bg-muted text-gray-700">
// //           <tr>
// //             <th className="px-4 py-3">Order ID</th>
// //             <th className="px-4 py-3">Item</th>
// //             <th className="px-4 py-3 text-center">Amount</th>
// //             <th className="px-4 py-3 text-center">Status</th>
// //             <th className="px-4 py-3 text-center">Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {orders?.map((order) => (
// //             <tr key={order.id} className="border-t hover:bg-muted/50">
// //               <td className="px-4 py-4 font-mono text-xs">
// //                 {order.id?.slice(0, 8)}...
// //               </td>
// //               <td className="px-4 py-4 font-medium">{order.gearTitle || "Gear Item"}</td>
// //               <td className="px-4 py-4 text-center font-semibold text-green-600">
// //                 ৳ {order.amount}
// //               </td>
// //               <td className="px-4 py-4 text-center">
// //                 <span
// //                   className={`rounded-full px-3 py-1 text-xs font-semibold ${
// //                     order.status === "RETURNED"
// //                       ? "bg-blue-100 text-blue-700"
// //                       : order.status === "DELIVERED"
// //                         ? "bg-green-100 text-green-700"
// //                         : "bg-yellow-100 text-yellow-700"
// //                   }`}
// //                 >
// //                   {order.status}
// //                 </span>
// //               </td>
// //               <td className="px-4 py-4 text-center">
// //                 {/* প্রোডাক্ট RETURNED হলেই শুধু রিভিউ দেওয়ার বাটন দেখাবে */}
// //                 {order.status === "RETURNED" ? (
// //                   <button
// //                     onClick={() =>
// //                       setSelectedOrder({
// //                         id: order.id,
// //                         title: order.gearTitle || "Gear Item",
// //                       })
// //                     }
// //                     className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100"
// //                   >
// //                     Leave Review
// //                   </button>
// //                 ) : (
// //                   <span className="text-xs text-gray-400">N/A</span>
// //                 )}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {selectedOrder && (
// //         <ReviewModal
// //           isOpen={!!selectedOrder}
// //           onClose={() => setSelectedOrder(null)}
// //           rentalOrderId={selectedOrder.id}
// //           gearTitle={selectedOrder.title}
// //         />
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import ReviewModal from "./reviewModal";
 

// export default function CustomerOrdersTable({ orders }: { orders: any[] }) {
//   const [selectedOrder, setSelectedOrder] = useState<{
//     id: string;
//     title: string;
//   } | null>(null);

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="flex h-32 items-center justify-center rounded-xl border bg-white text-muted-foreground">
//         No rental records found.
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
//       <table className="w-full text-left text-sm">
//         <thead className="bg-muted text-gray-700">
//           <tr>
//             <th className="px-4 py-3">Rental ID</th>
//             <th className="px-4 py-3">Gear Name</th>
//             <th className="px-4 py-3 text-center">Amount</th>
//             <th className="px-4 py-3 text-center">Status</th>
//             <th className="px-4 py-3 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((rental) => (
//             <tr key={rental.id} className="border-t hover:bg-muted/50">
//               <td className="px-4 py-4 font-mono text-xs">
//                 {rental.id?.slice(0, 10)}...
//               </td>
//               <td className="px-4 py-4 font-medium">
//                 {rental.gear?.title || rental.gearTitle || "Gear Item"}
//               </td>
//               <td className="px-4 py-4 text-center font-semibold text-green-600">
//                 ৳ {rental.totalCost || rental.amount || 0}
//               </td>
//               <td className="px-4 py-4 text-center">
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                     rental.status === "RETURNED"
//                       ? "bg-purple-100 text-purple-700"
//                       : rental.status === "APPROVED"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {rental.status}
//                 </span>
//               </td>
//               <td className="px-4 py-4 text-center">
//                 {rental.status === "RETURNED" ? (
//                   <button
//                     onClick={() =>
//                       setSelectedOrder({
//                         id: rental.id,
//                         title: rental.gear?.title || rental.gearTitle || "Gear Item",
//                       })
//                     }
//                     className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors"
//                   >
//                     Leave Review
//                   </button>
//                 ) : (
//                   <span className="text-xs text-gray-400">N/A</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedOrder && (
//         <ReviewModal
//           isOpen={!!selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//           rentalOrderId={selectedOrder.id}
//           gearTitle={selectedOrder.title}
//         />
//       )}
//     </div>
//   );
// }