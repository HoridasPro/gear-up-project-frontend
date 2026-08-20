/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import {
  Users,
  Package,
  ShoppingCart,
  Activity,
  Clock3,
  CheckCircle2,
  RotateCcw,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import CustomerPieChart from "../_components/customerPaichart";

import { getAdminOrdersDashboard } from "../_actions/get-admin-orders";
import { getAdminUsers } from "../_actions/get-admin-users";
import { getAdminAllGears } from "../_actions/get-admin-gears";

const AdminDashboard = async () => {
  const [usersResult, ordersResult, gearsResult] = await Promise.all([
    getAdminUsers(),
    getAdminOrdersDashboard(),
    getAdminAllGears(),
  ]);

  const orders = ordersResult?.data || [];
  const gears = gearsResult?.data || [];

  const totalUsers = usersResult?.total ?? 0;

  const totalOrders = orders.length;

  const totalGears = gears.length;

  const placeOrders = orders.filter(
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

  const totalRevenue = orders.reduce((total: number, order: any) => {
    if (order.status !== "CANCELLED" && order.status !== "REJECTED") {
      return total + Number(order.totalPrice || 0);
    }

    return total;
  }, 0);

  return (
    <div className="space-y-6 sm:space-y-8 p-2 sm:p-4 md:p-6 text-slate-100">
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-400 max-w-xl">
            Welcome back! Here&apos;s an overview of your platform.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                All Users
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {totalUsers}
              </h2>
            </div>
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400 transition-colors group-hover:bg-blue-500/20">
              <Users className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                All Orders
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {totalOrders}
              </h2>
            </div>
            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400 transition-colors group-hover:bg-purple-500/20">
              <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                All Gears
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {totalGears}
              </h2>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
              <Package className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                Active Orders
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeOrders}
              </h2>
            </div>
            <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400 transition-colors group-hover:bg-amber-500/20">
              <Activity className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-yellow-500/40">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-400">
              <Clock3 className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              Action Needed
            </span>
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
            {placeOrders}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">Place Orders</p>
        </div>

        <div className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              In Progress
            </span>
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
            {pickedupOrders}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            PickedUp Orders
          </p>
        </div>

        <div className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              <RotateCcw className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Completed
            </span>
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
            {returnedOrders}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Returned Orders
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="rounded-2xl bg-emerald-500/20 p-3.5 sm:p-4 text-emerald-400 ring-1 ring-emerald-500/30 shrink-0">
              <DollarSign className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Total Revenue
              </p>
              <h2 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                ৳ {totalRevenue.toLocaleString()}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5 w-fit">
            <TrendingUp className="h-4 w-4" />
            <span>Lifetime Gross Sales</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-6 shadow-xl backdrop-blur-xl overflow-hidden">
        <CustomerPieChart
          place={placeOrders}
          pickedup={pickedupOrders}
          returned={returnedOrders}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-7 shadow-xl backdrop-blur-xl">
          <h2 className="mb-6 text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            Platform Summary
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
              <span className="text-xs sm:text-sm font-medium text-slate-400">
                All Users
              </span>
              <span className="font-bold text-sm sm:text-base text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                {totalUsers}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
              <span className="text-xs sm:text-sm font-medium text-slate-400">
                All Orders
              </span>
              <span className="font-bold text-sm sm:text-base text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">
                {totalOrders}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
              <span className="text-xs sm:text-sm font-medium text-slate-400">
                All Gears
              </span>
              <span className="font-bold text-sm sm:text-base text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                {totalGears}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
              <span className="text-xs sm:text-sm font-medium text-slate-400">
                Active Orders
              </span>
              <span className="font-bold text-sm sm:text-base text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                {activeOrders}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-7 shadow-xl backdrop-blur-xl">
          <h2 className="mb-6 text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
              <span className="text-xs sm:text-sm font-medium text-slate-400">
                Place
              </span>
              <span className="font-bold text-sm sm:text-base text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-lg border border-yellow-500/20">
                {placeOrders}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
              <span className="text-xs sm:text-sm font-medium text-slate-400">
                PickedUp
              </span>
              <span className="font-bold text-sm sm:text-base text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                {pickedupOrders}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
              <span className="text-xs sm:text-sm font-medium text-slate-400">
                Active
              </span>
              <span className="font-bold text-sm sm:text-base text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                {activeOrders}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
              <span className="text-xs sm:text-sm font-medium text-slate-400">
                Returned
              </span>
              <span className="font-bold text-sm sm:text-base text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                {returnedOrders}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
