// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Package, Clock3, CheckCircle2 } from "lucide-react";
// // import { getProviderGear } from "../_actions/get-provider-gears";
// import { getProviderOrders } from "../_actions/get-provider-orders";
// import { getProviderGear } from "../_actions/get-provider-gears";
// // import { getProviderOrders } from "../_actions/get-provider-gear";
// // import { getProviderGear } from "../_actions/get-provider-gears";

// const ProviderDashboard = async () => {
//   const gearResult = await getProviderGear();
//   const orderResult = await getProviderOrders();

//   const gears = gearResult?.data || [];
//   const orders = orderResult?.data || [];

//   const totalGear = gears.length;

//   const activeRentals = orders.filter(
//     (order: any) => order.status === "APPROVED",
//   ).length;

//   const pendingOrders = orders.filter(
//     (order: any) => order.status === "PENDING",
//   ).length;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold">Provider Dashboard</h1>
//         <p className="mt-2 text-muted-foreground">
//           Welcome back! Heres an overview of your rental business.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//         {/* Total Gear */}
//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <Package className="mb-4 h-10 w-10 text-blue-600" />
//           <h2 className="text-3xl font-bold">{totalGear}</h2>
//           <p className="text-muted-foreground">Total Gears</p>
//         </div>

//         {/* Active Rentals */}
//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <CheckCircle2 className="mb-4 h-10 w-10 text-green-600" />
//           <h2 className="text-3xl font-bold">{activeRentals}</h2>
//           <p className="text-muted-foreground">Active Rentals</p>
//         </div>

//         {/* Pending Orders */}
//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <Clock3 className="mb-4 h-10 w-10 text-yellow-500" />
//           <h2 className="text-3xl font-bold">{pendingOrders}</h2>
//           <p className="text-muted-foreground">Pending Orders</p>
//         </div>
//       </div>

//       {/* Recent Orders */}
//       <div className="rounded-xl border bg-white shadow-sm">
//         <div className="border-b p-6">
//           <h2 className="text-xl font-semibold">Recent Orders</h2>
//         </div>

//         {orders.length === 0 ? (
//           <div className="p-10 text-center text-muted-foreground">
//             No orders found.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-muted">
//                 <tr>
//                   <th className="px-6 py-3 text-left">Customer</th>
//                   <th className="px-6 py-3 text-left">Gear</th>
//                   <th className="px-6 py-3 text-center">Quantity</th>
//                   <th className="px-6 py-3 text-center">Total Price</th>
//                   <th className="px-6 py-3 text-center">Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {orders.slice(0, 5).map((order: any) => (
//                   <tr
//                     key={order.id}
//                     className="border-t transition hover:bg-muted/50"
//                   >
//                     <td className="px-6 py-4">
//                       {order.customer?.name || "N/A"}
//                     </td>

//                     <td className="px-6 py-4">
//                       {order.gearItem?.title || "N/A"}
//                     </td>

//                     <td className="px-6 py-4 text-center">{order.quantity}</td>

//                     <td className="px-6 py-4 text-center font-semibold text-green-600">
//                       ৳ {order.totalPrice}
//                     </td>

//                     <td className="px-6 py-4 text-center">
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                           order.status === "PENDING"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : order.status === "APPROVED"
//                               ? "bg-green-100 text-green-700"
//                               : order.status === "RETURNED"
//                                 ? "bg-blue-100 text-blue-700"
//                                 : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProviderDashboard;
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Package, Clock3, CheckCircle2 } from "lucide-react";

import { getProviderGears } from "../_actions/get-provider-gear";
 

const ProviderDashboard = async () => {
  const gearResult = await getProviderGears();
  const orderResult = await getProviderGears();

  const gears = gearResult?.data || [];
  const orders = orderResult?.data || [];

  const totalGear = gears.length;

  const activeRentals = orders.filter(
    (order: any) => order.status === "APPROVED",
  ).length;

  const pendingOrders = orders.filter(
    (order: any) => order.status === "PENDING",
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Provider Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back! Heres an overview of your rental business.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <Package className="mb-4 h-10 w-10 text-blue-600" />

          <h2 className="text-3xl font-bold">{totalGear}</h2>

          <p className="text-muted-foreground">Total Gears</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <CheckCircle2 className="mb-4 h-10 w-10 text-green-600" />

          <h2 className="text-3xl font-bold">{activeRentals}</h2>

          <p className="text-muted-foreground">Active Rentals</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <Clock3 className="mb-4 h-10 w-10 text-yellow-500" />

          <h2 className="text-3xl font-bold">{pendingOrders}</h2>

          <p className="text-muted-foreground">Pending Orders</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Gear</th>
                  <th className="px-6 py-3 text-center">Quantity</th>
                  <th className="px-6 py-3 text-center">Total Price</th>
                  <th className="px-6 py-3 text-center">Rental Date</th>
                  <th className="px-6 py-3 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 5).map((order: any) => (
                  <tr
                    key={order.id}
                    className="border-t transition hover:bg-muted/50"
                  >
                    <td className="px-6 py-4">
                      {order.customer?.name ?? "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {order.gearItem?.title ?? "N/A"}
                    </td>

                    <td className="px-6 py-4 text-center">{order.quantity}</td>

                    <td className="px-6 py-4 text-center font-semibold text-green-600">
                      ৳ {order.totalPrice}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {new Date(order.rentalDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : order.status === "RETURNED"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
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
};

export default ProviderDashboard;
