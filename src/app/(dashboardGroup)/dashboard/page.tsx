/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Package, Clock3, CheckCircle2, RotateCcw } from "lucide-react";

// const CustomerDashboard = () => {
//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold">Customer Dashboard</h1>
//         <p className="mt-2 text-muted-foreground">
//           Welcome back! Here s an overview of your rental activities.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <Package className="mb-4 h-10 w-10 text-blue-600" />
//           <h2 className="text-3xl font-bold">12</h2>
//           <p className="text-muted-foreground">Total Rentals</p>
//         </div>

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <Clock3 className="mb-4 h-10 w-10 text-yellow-500" />
//           <h2 className="text-3xl font-bold">3</h2>
//           <p className="text-muted-foreground">Pending Rentals</p>
//         </div>

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <CheckCircle2 className="mb-4 h-10 w-10 text-green-600" />
//           <h2 className="text-3xl font-bold">7</h2>
//           <p className="text-muted-foreground">Approved Rentals</p>
//         </div>

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <RotateCcw className="mb-4 h-10 w-10 text-purple-600" />
//           <h2 className="text-3xl font-bold">2</h2>
//           <p className="text-muted-foreground">Returned Rentals</p>
//         </div>
//       </div>

//       {/* Recent Rentals */}
//       <div className="rounded-xl border bg-white shadow-sm">
//         <div className="border-b p-6">
//           <h2 className="text-xl font-semibold">Recent Rentals</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-muted">
//               <tr>
//                 <th className="px-6 py-3 text-left">Gear</th>
//                 <th className="px-6 py-3 text-center">Quantity</th>
//                 <th className="px-6 py-3 text-center">Price</th>
//                 <th className="px-6 py-3 text-center">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               <tr className="border-t">
//                 <td className="px-6 py-4">Mountain Bike</td>
//                 <td className="px-6 py-4 text-center">2</td>
//                 <td className="px-6 py-4 text-center">৳ 19,600</td>
//                 <td className="px-6 py-4 text-center">
//                   <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
//                     Pending
//                   </span>
//                 </td>
//               </tr>

//               <tr className="border-t">
//                 <td className="px-6 py-4">Camping Tent</td>
//                 <td className="px-6 py-4 text-center">1</td>
//                 <td className="px-6 py-4 text-center">৳ 4,500</td>
//                 <td className="px-6 py-4 text-center">
//                   <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
//                     Approved
//                   </span>
//                 </td>
//               </tr>

//               <tr className="border-t">
//                 <td className="px-6 py-4">Kayak</td>
//                 <td className="px-6 py-4 text-center">1</td>
//                 <td className="px-6 py-4 text-center">৳ 8,000</td>
//                 <td className="px-6 py-4 text-center">
//                   <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
//                     Returned
//                   </span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;
import { Package, Clock3, CheckCircle2, RotateCcw } from "lucide-react";
import { getCustomerDashboard } from "../_actions/get-rentals";
// import { getCustomerDashboard } from "../_actions/get-dashboard";

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

      {/* Recent Rentals */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Recent Rentals</h2>
        </div>

        {rentals.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            No rentals found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left">Gear</th>
                  <th className="px-6 py-3 text-center">Quantity</th>
                  <th className="px-6 py-3 text-center">Price</th>
                  <th className="px-6 py-3 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {rentals.slice(0, 5).map((rental: any) => (
                  <tr key={rental.id} className="border-t">
                    <td className="px-6 py-4">
                      {rental.gearItem?.title || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-center">{rental.quantity}</td>

                    <td className="px-6 py-4 text-center">
                      ৳ {rental.totalPrice}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          rental.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : rental.status === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : rental.status === "RETURNED"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {rental.status}
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

export default CustomerDashboard;
