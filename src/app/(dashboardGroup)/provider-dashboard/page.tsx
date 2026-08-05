// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { Package, Clock3, CheckCircle2, RotateCcw } from "lucide-react";
// import { getCustomerDashboard } from "../_actions/get-rentals";
// import CustomerPieChart from "../_components/customerPaichart";
// import { getProviderGears } from "../_actions/get-provider-gear";

// const CustomerDashboard = async () => {
//   const result = await getProviderGears();

//   const rentals = result?.data || [];

//   const totalRentals = rentals.length;

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
//           <p className="text-muted-foreground">Total Gears</p>
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
//       {/* Rental Status Chart */}
//       <CustomerPieChart
//         pending={pendingRentals}
//         approved={approvedRentals}
//         returned={returnedRentals}
//       />

//       {/* Dashboard Overview */}
//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Rental Summary */}
//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <h2 className="mb-6 text-xl font-semibold">Rental Summary</h2>

//           <div className="space-y-5">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Total Rentals</span>
//               <span className="font-bold text-blue-600">{totalRentals}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Pending Rentals</span>
//               <span className="font-bold text-yellow-500">
//                 {pendingRentals}
//               </span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Approved Rentals</span>
//               <span className="font-bold text-green-600">
//                 {approvedRentals}
//               </span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Returned Rentals</span>
//               <span className="font-bold text-purple-600">
//                 {returnedRentals}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Account Overview */}
//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <h2 className="mb-6 text-xl font-semibold">Account Overview</h2>

//           <div className="space-y-5">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Active Rentals</span>
//               <span className="font-semibold">
//                 {pendingRentals + approvedRentals}
//               </span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Completed Rentals</span>
//               <span className="font-semibold">{returnedRentals}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Completion Rate</span>
//               <span className="font-semibold text-green-600">
//                 {totalRentals
//                   ? `${Math.round((returnedRentals / totalRentals) * 100)}%`
//                   : "0%"}
//               </span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Account Status</span>

//               <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
//                 Active
//               </span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Latest Activity</span>
//               <span className="font-semibold">
//                 {totalRentals > 0 ? "Rental Found" : "No Activity"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Package,
  ShoppingCart,
  Clock3,
  CheckCircle2,
  RotateCcw,
  DollarSign,
} from "lucide-react";
// import ProviderPieChart from "../../(dashboardGroup)/_components/providerPieChart";
import { getProviderGears } from "../_actions/get-provider-gear";
import { getProviderOrders } from "../_actions/get-provider-orders";
import ProviderPieChart from "../_components/providerPieChart";
// import { getProviderOrders } from "../_actions/get-provider-orders";
// import { getProviderGears } from "../_actions/get-provider-gear";

const ProviderDashboard = async () => {
  const gearResult = await getProviderGears();
  const orderResult = await getProviderOrders();

  const gears = gearResult?.data || [];
  const orders = orderResult?.data || [];

  const totalGears = gears.length;
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (item: any) => item.status === "PENDING",
  ).length;

  const pickedupOrders = orders.filter(
    (item: any) => item.status === "PICKEDUP",
  ).length;

  const returnedOrders = orders.filter(
    (item: any) => item.status === "RETURNED",
  ).length;

  const totalRevenue = orders
    .filter((item: any) => item.status === "RETURNED")
    .reduce((sum: number, item: any) => sum + item.totalPrice, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Provider Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your gears and track rental performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={<Package className="h-8 w-8 text-blue-600" />}
          title="Total Gears"
          value={totalGears}
        />

        <StatCard
          icon={<ShoppingCart className="h-8 w-8 text-indigo-600" />}
          title="Total Orders"
          value={totalOrders}
        />

        <StatCard
          icon={<Clock3 className="h-8 w-8 text-yellow-500" />}
          title="Pending Orders"
          value={pendingOrders}
        />

        <StatCard
          icon={<CheckCircle2 className="h-8 w-8 text-green-600" />}
          title="Picked up Orders"
          value={pickedupOrders}
        />

        <StatCard
          icon={<RotateCcw className="h-8 w-8 text-purple-600" />}
          title="Returned Orders"
          value={returnedOrders}
        />

        <StatCard
          icon={<DollarSign className="h-8 w-8 text-emerald-600" />}
          title="Revenue"
          value={`৳ ${totalRevenue}`}
        />
      </div>

      {/* Chart */}
      <ProviderPieChart
        pending={pendingOrders}
        pickedup={pickedupOrders}
        returned={returnedOrders}
      />

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Order Summary */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

          <div className="space-y-4">
            <SummaryRow label="Total Orders" value={totalOrders} />

            <SummaryRow label="Pending Orders" value={pendingOrders} />

            <SummaryRow label="Approved Orders" value={pickedupOrders} />

            <SummaryRow label="Returned Orders" value={returnedOrders} />

            <SummaryRow
              label="Revenue"
              value={`৳ ${totalRevenue}`}
              color="text-green-600"
            />
          </div>
        </div>

        {/* Inventory Overview */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Inventory Overview</h2>

          <div className="space-y-4">
            <SummaryRow label="Total Gears" value={totalGears} />

            <SummaryRow
              label="Available Gears"
              value={gears.filter((g: any) => g.quantity > 0).length}
            />

            <SummaryRow
              label="Out of Stock"
              value={gears.filter((g: any) => g.quantity === 0).length}
            />

            <SummaryRow
              label="Low Stock"
              value={gears.filter((g: any) => g.quantity <= 5).length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4">{icon}</div>

      <h2 className="text-3xl font-bold">{value}</h2>

      <p className="text-muted-foreground">{title}</p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  color,
}: {
  label: string;
  value: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>

      <span className={`font-bold ${color || ""}`}>{value}</span>
    </div>
  );
}
