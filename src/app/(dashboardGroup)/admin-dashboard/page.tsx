// /* eslint-disable @typescript-eslint/no-explicit-any */

// import {
//   Users,
//   Package,
//   ShoppingCart,
//   Activity,
//   Clock3,
//   CheckCircle2,
//   RotateCcw,
//   XCircle,
//   DollarSign,
// } from "lucide-react";

// import CustomerPieChart from "../_components/customerPaichart";

// import { getAdminOrdersDashboard } from "../_actions/get-admin-orders";
// import { getAdminUsers } from "../_actions/get-admin-users";
// import { getAdminAllGears } from "../_actions/get-admin-gears";
// // import { getAdminGears } from "../_actions/get-admin-gears";

// const AdminDashboard = async () => {
//   // =========================
//   // Fetch all admin data
//   // =========================

//   const [usersResult, ordersResult, gearsResult] = await Promise.all([
//     getAdminUsers(),
//     getAdminOrdersDashboard(),
//     getAdminAllGears(),
//   ]);

//   // =========================
//   // Extract data
//   // =========================

//   const users = usersResult?.data || [];
//   console.log("get all users", users);
//   const orders = ordersResult?.data || [];
//   const gears = gearsResult?.data || [];

//   // =========================
//   // Main stats
//   // =========================

//   const totalUsers = users.length;

//   const totalOrders = orders.length;

//   const totalGears = gears.length;

//   // =========================
//   // Order status
//   // =========================

//   const pendingOrders = orders.filter(
//     (order: any) => order.status === "PENDING" || order.status === "PLACED",
//   ).length;

//   const approvedOrders = orders.filter(
//     (order: any) => order.status === "APPROVED" || order.status === "CONFIRMED",
//   ).length;

//   const activeOrders = orders.filter(
//     (order: any) =>
//       order.status === "APPROVED" ||
//       order.status === "CONFIRMED" ||
//       order.status === "PAID" ||
//       order.status === "PICKED_UP",
//   ).length;

//   const returnedOrders = orders.filter(
//     (order: any) => order.status === "RETURNED",
//   ).length;

//   const cancelledOrders = orders.filter(
//     (order: any) => order.status === "CANCELLED" || order.status === "REJECTED",
//   ).length;

//   // =========================
//   // Revenue
//   // =========================

//   const totalRevenue = orders.reduce((total: number, order: any) => {
//     if (order.status !== "CANCELLED" && order.status !== "REJECTED") {
//       return total + Number(order.totalPrice || 0);
//     }

//     return total;
//   }, 0);

//   return (
//     <div className="space-y-8">
//       {/* =========================
//           Header
//       ========================= */}

//       <div>
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//         <p className="mt-2 text-muted-foreground">
//           Welcome back! Here&apos;s an overview of your platform.
//         </p>
//       </div>

//       {/* =========================
//           Main Stats
//       ========================= */}

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {/* All Users */}

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">All Users</p>

//               <h2 className="mt-2 text-3xl font-bold">{totalUsers}</h2>
//             </div>

//             <Users className="h-10 w-10 text-blue-600" />
//           </div>
//         </div>

//         {/* All Orders */}

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">All Orders</p>

//               <h2 className="mt-2 text-3xl font-bold">{totalOrders}</h2>
//             </div>

//             <ShoppingCart className="h-10 w-10 text-purple-600" />
//           </div>
//         </div>

//         {/* All Gears */}

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">All Gears</p>

//               <h2 className="mt-2 text-3xl font-bold">{totalGears}</h2>
//             </div>

//             <Package className="h-10 w-10 text-green-600" />
//           </div>
//         </div>

//         {/* Active Orders */}

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Active Orders</p>

//               <h2 className="mt-2 text-3xl font-bold">{activeOrders}</h2>
//             </div>

//             <Activity className="h-10 w-10 text-orange-500" />
//           </div>
//         </div>
//       </div>

//       {/* =========================
//           Order Stats
//       ========================= */}

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {/* Pending */}

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <Clock3 className="mb-4 h-9 w-9 text-yellow-500" />

//           <h2 className="text-3xl font-bold">{pendingOrders}</h2>

//           <p className="text-muted-foreground">Pending Orders</p>
//         </div>

//         {/* Approved */}

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <CheckCircle2 className="mb-4 h-9 w-9 text-blue-600" />

//           <h2 className="text-3xl font-bold">{approvedOrders}</h2>

//           <p className="text-muted-foreground">Approved Orders</p>
//         </div>

//         {/* Returned */}

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <RotateCcw className="mb-4 h-9 w-9 text-green-600" />

//           <h2 className="text-3xl font-bold">{returnedOrders}</h2>

//           <p className="text-muted-foreground">Returned Orders</p>
//         </div>

//         {/* Cancelled */}

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <XCircle className="mb-4 h-9 w-9 text-red-600" />

//           <h2 className="text-3xl font-bold">{cancelledOrders}</h2>

//           <p className="text-muted-foreground">Cancelled Orders</p>
//         </div>
//       </div>

//       {/* =========================
//           Revenue
//       ========================= */}

//       <div className="rounded-xl border bg-white p-6 shadow-sm">
//         <div className="flex items-center gap-4">
//           <div className="rounded-full bg-green-100 p-3">
//             <DollarSign className="h-7 w-7 text-green-600" />
//           </div>

//           <div>
//             <p className="text-sm text-muted-foreground">Total Revenue</p>

//             <h2 className="text-3xl font-bold">
//               ৳ {totalRevenue.toLocaleString()}
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* =========================
//           Chart
//       ========================= */}

//       <CustomerPieChart
//         pending={pendingOrders}
//         approved={approvedOrders}
//         returned={returnedOrders}
//       />

//       {/* =========================
//           Dashboard Overview
//       ========================= */}

//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Platform Summary */}

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <h2 className="mb-6 text-xl font-semibold">Platform Summary</h2>

//           <div className="space-y-5">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">All Users</span>

//               <span className="font-bold text-blue-600">{totalUsers}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">All Orders</span>

//               <span className="font-bold text-purple-600">{totalOrders}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">All Gears</span>

//               <span className="font-bold text-green-600">{totalGears}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Active Orders</span>

//               <span className="font-bold text-orange-500">{activeOrders}</span>
//             </div>
//           </div>
//         </div>

//         {/* Order Summary */}

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

//           <div className="space-y-5">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Pending</span>

//               <span className="font-bold text-yellow-500">{pendingOrders}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Approved</span>

//               <span className="font-bold text-blue-600">{approvedOrders}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Active</span>

//               <span className="font-bold text-orange-500">{activeOrders}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Returned</span>

//               <span className="font-bold text-green-600">{returnedOrders}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Cancelled</span>

//               <span className="font-bold text-red-600">{cancelledOrders}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Users,
  Package,
  ShoppingCart,
  Activity,
  Clock3,
  CheckCircle2,
  RotateCcw,
  XCircle,
  DollarSign,
} from "lucide-react";

import CustomerPieChart from "../_components/customerPaichart";

import { getAdminOrdersDashboard } from "../_actions/get-admin-orders";
import { getAdminUsers } from "../_actions/get-admin-users";
import { getAdminAllGears } from "../_actions/get-admin-gears";

const AdminDashboard = async () => {
  // =========================
  // Fetch all admin data
  // =========================

  const [usersResult, ordersResult, gearsResult] = await Promise.all([
    getAdminUsers(),
    getAdminOrdersDashboard(),
    getAdminAllGears(),
  ]);

  // =========================
  // Extract data
  // =========================

  const users = usersResult?.data || [];

  console.log("Admin Dashboard users:", users);
  console.log("Admin Dashboard total users:", usersResult?.total);

  const orders = ordersResult?.data || [];
  const gears = gearsResult?.data || [];

  // =========================
  // Main stats
  // =========================

  // IMPORTANT:
  // users.length দিলে pagination-এর current page-এর
  // user count আসবে।
  //
  // তাই database-এর total user count-এর জন্য
  // usersResult.total ব্যবহার করছি।

  const totalUsers = usersResult?.total ?? 0;

  const totalOrders = orders.length;

  const totalGears = gears.length;

  // =========================
  // Order status
  // =========================

  const pendingOrders = orders.filter(
    (order: any) => order.status === "PENDING" || order.status === "PLACED",
  ).length;

  const approvedOrders = orders.filter(
    (order: any) => order.status === "APPROVED" || order.status === "CONFIRMED",
  ).length;

  const activeOrders = orders.filter(
    (order: any) =>
      order.status === "APPROVED" ||
      order.status === "CONFIRMED" ||
      order.status === "PAID" ||
      order.status === "PICKED_UP",
  ).length;

  const returnedOrders = orders.filter(
    (order: any) => order.status === "RETURNED",
  ).length;

  const cancelledOrders = orders.filter(
    (order: any) => order.status === "CANCELLED" || order.status === "REJECTED",
  ).length;

  // =========================
  // Revenue
  // =========================

  const totalRevenue = orders.reduce((total: number, order: any) => {
    if (order.status !== "CANCELLED" && order.status !== "REJECTED") {
      return total + Number(order.totalPrice || 0);
    }

    return total;
  }, 0);

  return (
    <div className="space-y-6">
      {/* =========================
          Header
      ========================= */}

      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back! Here&apos;s an overview of your platform.
        </p>
      </div>

      {/* =========================
          Main Stats
      ========================= */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* All Users */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">All Users</p>

              <h2 className="mt-2 text-3xl font-bold">{totalUsers}</h2>
            </div>

            <Users className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        {/* All Orders */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">All Orders</p>

              <h2 className="mt-2 text-3xl font-bold">{totalOrders}</h2>
            </div>

            <ShoppingCart className="h-10 w-10 text-purple-600" />
          </div>
        </div>

        {/* All Gears */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">All Gears</p>

              <h2 className="mt-2 text-3xl font-bold">{totalGears}</h2>
            </div>

            <Package className="h-10 w-10 text-green-600" />
          </div>
        </div>

        {/* Active Orders */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Orders</p>

              <h2 className="mt-2 text-3xl font-bold">{activeOrders}</h2>
            </div>

            <Activity className="h-10 w-10 text-orange-500" />
          </div>
        </div>
      </div>

      {/* =========================
          Order Stats
      ========================= */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Pending */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <Clock3 className="mb-4 h-9 w-9 text-yellow-500" />

          <h2 className="text-3xl font-bold">{pendingOrders}</h2>

          <p className="text-muted-foreground">Pending Orders</p>
        </div>

        {/* Approved */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <CheckCircle2 className="mb-4 h-9 w-9 text-blue-600" />

          <h2 className="text-3xl font-bold">{approvedOrders}</h2>

          <p className="text-muted-foreground">Approved Orders</p>
        </div>

        {/* Returned */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <RotateCcw className="mb-4 h-9 w-9 text-green-600" />

          <h2 className="text-3xl font-bold">{returnedOrders}</h2>

          <p className="text-muted-foreground">Returned Orders</p>
        </div>

        {/* Cancelled */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <XCircle className="mb-4 h-9 w-9 text-red-600" />

          <h2 className="text-3xl font-bold">{cancelledOrders}</h2>

          <p className="text-muted-foreground">Cancelled Orders</p>
        </div>
      </div>

      {/* =========================
          Revenue
      ========================= */}

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-green-100 p-3">
            <DollarSign className="h-7 w-7 text-green-600" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>

            <h2 className="text-3xl font-bold">
              ৳ {totalRevenue.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      {/* =========================
          Chart
      ========================= */}

      <CustomerPieChart
        pending={pendingOrders}
        approved={approvedOrders}
        returned={returnedOrders}
      />

      {/* =========================
          Dashboard Overview
      ========================= */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Platform Summary */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Platform Summary</h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">All Users</span>

              <span className="font-bold text-blue-600">{totalUsers}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">All Orders</span>

              <span className="font-bold text-purple-600">{totalOrders}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">All Gears</span>

              <span className="font-bold text-green-600">{totalGears}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Active Orders</span>

              <span className="font-bold text-orange-500">{activeOrders}</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pending</span>

              <span className="font-bold text-yellow-500">{pendingOrders}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Approved</span>

              <span className="font-bold text-blue-600">{approvedOrders}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Active</span>

              <span className="font-bold text-orange-500">{activeOrders}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Returned</span>

              <span className="font-bold text-green-600">{returnedOrders}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Cancelled</span>

              <span className="font-bold text-red-600">{cancelledOrders}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
