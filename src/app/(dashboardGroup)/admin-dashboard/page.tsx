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
  const [usersResult, ordersResult, gearsResult] =
    await Promise.all([
      getAdminUsers(),
      getAdminOrdersDashboard(),
      getAdminAllGears(),
    ]);

  const users = usersResult?.data || [];

  console.log("Admin Dashboard users:", users);
  console.log("Admin Dashboard total users:", usersResult?.total);

  const orders = ordersResult?.data || [];
  const gears = gearsResult?.data || [];
 

  const totalUsers = usersResult?.total ?? 0;

  const totalOrders = orders.length;

  const totalGears = gears.length;
  

  const pendingOrders = orders.filter(
    (order: any) => order.status === "PENDING" || order.status === "PLACED",
  ).length;

  const pickedupOrders = orders.filter(
    (order: any) => order.status === "PICKEDUP" || order.status === "CONFIRMED",
  ).length;

  const activeOrders = orders.filter(
    (order: any) =>
      order.status === "PICKEDUP" ||
      order.status === "CONFIRMED" ||
      order.status === "PAID" ||
      order.status === "PICKED_UP",
  ).length;

  const returnedOrders = orders.filter(
    (order: any) => order.status === "RETURNED",
  ).length;

  // const cancelledOrders = orders.filter(
  //   (order: any) => order.status === "CANCELLED" || order.status === "REJECTED",
  // ).length;

  const totalRevenue = orders.reduce((total: number, order: any) => {
    if (order.status !== "CANCELLED" && order.status !== "REJECTED") {
      return total + Number(order.totalPrice || 0);
    }

    return total;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back! Here&apos;s an overview of your platform.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">All Users</p>

              <h2 className="mt-2 text-3xl font-bold">{totalUsers}</h2>
            </div>

            <Users className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">All Orders</p>

              <h2 className="mt-2 text-3xl font-bold">{totalOrders}</h2>
            </div>

            <ShoppingCart className="h-10 w-10 text-purple-600" />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">All Gears</p>

              <h2 className="mt-2 text-3xl font-bold">{totalGears}</h2>
            </div>

            <Package className="h-10 w-10 text-green-600" />
          </div>
        </div>

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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <Clock3 className="mb-4 h-9 w-9 text-yellow-500" />

          <h2 className="text-3xl font-bold">{pendingOrders}</h2>

          <p className="text-muted-foreground">Pending Orders</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <CheckCircle2 className="mb-4 h-9 w-9 text-blue-600" />

          <h2 className="text-3xl font-bold">{pickedupOrders}</h2>

          <p className="text-muted-foreground">PickedUp Orders</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <RotateCcw className="mb-4 h-9 w-9 text-green-600" />

          <h2 className="text-3xl font-bold">{returnedOrders}</h2>

          <p className="text-muted-foreground">Returned Orders</p>
        </div>

        {/* <div className="rounded-xl border bg-white p-6 shadow-sm">
          <XCircle className="mb-4 h-9 w-9 text-red-600" />

          <h2 className="text-3xl font-bold">{cancelledOrders}</h2>

          <p className="text-muted-foreground">Cancelled Orders</p>
        </div> */}
      </div>

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

      <CustomerPieChart
        pending={pendingOrders}
        pickedup={pickedupOrders}
        returned={returnedOrders}
      />

      <div className="grid gap-6 lg:grid-cols-2">
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

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pending</span>

              <span className="font-bold text-yellow-500">{pendingOrders}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">PickedUp</span>

              <span className="font-bold text-blue-600">{pickedupOrders}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Active</span>

              <span className="font-bold text-orange-500">{activeOrders}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Returned</span>

              <span className="font-bold text-green-600">{returnedOrders}</span>
            </div>

            {/* <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Cancelled</span>

              <span className="font-bold text-red-600">{cancelledOrders}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
 
 
