// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { Package, Clock3, CheckCircle2, RotateCcw } from "lucide-react";
// import { getCustomerDashboard } from "../_actions/get-rentals";

// const CustomerDashboard = async () => {
//   const result = await getCustomerDashboard();

// console.log("get result",result);
// console.log("get result data",result.data);
// console.log("get result length",result.data.length);

//   const rentals = result?.data || [];

//   const totalRentals = rentals?.length;
//   const pendingRentals = rentals.filter(
//     (item: any) => item.status === "PENDING",
//   ).length;

//   const approvedRentals = rentals.filter(
//     (item: any) => item.status === "APPROVED",
//   ).length;

//   const returnedRentals = rentals.filter(
//     (item: any) => item.status === "RETURNED",
//   ).length;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold">Customer Dashboard</h1>
//         <p className="mt-2 text-muted-foreground">
//           Welcome back! Heres an overview of your rental activities.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <Package className="mb-4 h-10 w-10 text-blue-600" />
//           <h2 className="text-3xl font-bold">{totalRentals}</h2>
//           <p className="text-muted-foreground">Total Rentals</p>
//         </div>

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <Clock3 className="mb-4 h-10 w-10 text-yellow-500" />
//           <h2 className="text-3xl font-bold">{pendingRentals}</h2>
//           <p className="text-muted-foreground">Pending Rentals</p>
//         </div>

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <CheckCircle2 className="mb-4 h-10 w-10 text-green-600" />
//           <h2 className="text-3xl font-bold">{approvedRentals}</h2>
//           <p className="text-muted-foreground">Approved Rentals</p>
//         </div>

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <RotateCcw className="mb-4 h-10 w-10 text-purple-600" />
//           <h2 className="text-3xl font-bold">{returnedRentals}</h2>
//           <p className="text-muted-foreground">Returned Rentals</p>
//         </div>
//       </div>

//       {/* Recent Rentals */}
//       <div className="rounded-xl border bg-white shadow-sm">
//         <div className="border-b p-6">
//           <h2 className="text-xl font-semibold">Recent Rentals</h2>
//         </div>

//         {rentals.length === 0 ? (
//           <div className="p-10 text-center text-muted-foreground">
//             No rentals found.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-muted">
//                 <tr>
//                   <th className="px-6 py-3 text-left">Gear</th>
//                   <th className="px-6 py-3 text-center">Quantity</th>
//                   <th className="px-6 py-3 text-center">Price</th>
//                   <th className="px-6 py-3 text-center">Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {rentals.slice(0, 5).map((rental: any) => (
//                   <tr key={rental.id} className="border-t">
//                     <td className="px-6 py-4">
//                       {rental.gearItem?.title || "N/A"}
//                     </td>

//                     <td className="px-6 py-4 text-center">{rental.quantity}</td>

//                     <td className="px-6 py-4 text-center">
//                       ৳ {rental.totalPrice}
//                     </td>

//                     <td className="px-6 py-4 text-center">
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                           rental.status === "PENDING"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : rental.status === "APPROVED"
//                               ? "bg-green-100 text-green-700"
//                               : rental.status === "RETURNED"
//                                 ? "bg-blue-100 text-blue-700"
//                                 : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {rental.status}
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

// export default CustomerDashboard;
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Package, Clock3, CheckCircle2, RotateCcw } from "lucide-react";
import { getCustomerDashboard } from "../_actions/get-rentals";
import CustomerPieChart from "../_components/customerPaichart";

const CustomerDashboard = async () => {
  const result = await getCustomerDashboard();

  const rentals = result?.data || [];

  const totalRentals = rentals.length;

  const pendingRentals = rentals.filter(
    (item: any) => item.status === "PENDING",
  ).length;

  const approvedRentals = rentals.filter(
    (item: any) => item.status === "APPROVED",
  ).length;

  const returnedRentals = rentals.filter(
    (item: any) => item.status === "RETURNED",
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Customer Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Heres an overview of your rental activities.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <Package className="mb-4 h-10 w-10 text-blue-600" />
          <h2 className="text-3xl font-bold">{totalRentals}</h2>
          <p className="text-muted-foreground">Total Rentals</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <Clock3 className="mb-4 h-10 w-10 text-yellow-500" />
          <h2 className="text-3xl font-bold">{pendingRentals}</h2>
          <p className="text-muted-foreground">Pending Rentals</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <CheckCircle2 className="mb-4 h-10 w-10 text-green-600" />
          <h2 className="text-3xl font-bold">{approvedRentals}</h2>
          <p className="text-muted-foreground">Approved Rentals</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <RotateCcw className="mb-4 h-10 w-10 text-purple-600" />
          <h2 className="text-3xl font-bold">{returnedRentals}</h2>
          <p className="text-muted-foreground">Returned Rentals</p>
        </div>
      </div>
      {/* Rental Status Chart */}
      <CustomerPieChart
        pending={pendingRentals}
        approved={approvedRentals}
        returned={returnedRentals}
      />

      {/* Dashboard Overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Rental Summary */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Rental Summary</h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Rentals</span>
              <span className="font-bold text-blue-600">{totalRentals}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pending Rentals</span>
              <span className="font-bold text-yellow-500">
                {pendingRentals}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Approved Rentals</span>
              <span className="font-bold text-green-600">
                {approvedRentals}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Returned Rentals</span>
              <span className="font-bold text-purple-600">
                {returnedRentals}
              </span>
            </div>
          </div>
        </div>

        {/* Account Overview */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Account Overview</h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Active Rentals</span>
              <span className="font-semibold">
                {pendingRentals + approvedRentals}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Completed Rentals</span>
              <span className="font-semibold">{returnedRentals}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Completion Rate</span>
              <span className="font-semibold text-green-600">
                {totalRentals
                  ? `${Math.round((returnedRentals / totalRentals) * 100)}%`
                  : "0%"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Account Status</span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Latest Activity</span>
              <span className="font-semibold">
                {totalRentals > 0 ? "Rental Found" : "No Activity"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
