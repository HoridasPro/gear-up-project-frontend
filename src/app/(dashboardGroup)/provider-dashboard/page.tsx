/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Package,
  ShoppingCart,
  Clock3,
  CheckCircle2,
  RotateCcw,
  DollarSign,
} from "lucide-react";
import { getProviderGears } from "../_actions/get-provider-gear";
import { getProviderOrders } from "../_actions/get-provider-orders";
import ProviderPieChart from "../_components/providerPieChart";

const ProviderDashboard = async () => {
  const gearResult = await getProviderGears();
  const orderResult = await getProviderOrders();

  const gears = gearResult?.data || [];
  const orders = orderResult?.data || [];

  const totalGears = gears.length;
  const totalOrders = orders.length;

  const placeOrders = orders.filter(
    (item: any) => item.status === "PLACED",
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
    <div className="space-y-8 p-4 sm:p-6 lg:p-2 min-h-screen text-gray-100">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Provider Dashboard
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Manage my gears and track rental performance.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<Package className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />}
          title="Total Gears"
          value={totalGears}
          badgeColor="bg-blue-500/10 border-blue-500/20"
        />

        <StatCard
          icon={
            <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-400" />
          }
          title="Total Orders"
          value={totalOrders}
          badgeColor="bg-indigo-500/10 border-indigo-500/20"
        />

        <StatCard
          icon={<Clock3 className="h-6 w-6 sm:h-7 sm:w-7 text-amber-400" />}
          title="Place Orders"
          value={placeOrders}
          badgeColor="bg-amber-500/10 border-amber-500/20"
        />

        <StatCard
          icon={
            <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400" />
          }
          title="Picked up Orders"
          value={pickedupOrders}
          badgeColor="bg-emerald-500/10 border-emerald-500/20"
        />

        <StatCard
          icon={<RotateCcw className="h-6 w-6 sm:h-7 sm:w-7 text-purple-400" />}
          title="Returned Orders"
          value={returnedOrders}
          badgeColor="bg-purple-500/10 border-purple-500/20"
        />

        <StatCard
          icon={
            <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400" />
          }
          title="Revenue"
          value={`৳ ${totalRevenue}`}
          badgeColor="bg-emerald-500/10 border-emerald-500/20"
        />
      </div>

      <div className="rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
        <ProviderPieChart
          place={placeOrders}
          pickedup={pickedupOrders}
          returned={returnedOrders}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
          <h2 className="mb-6 text-lg sm:text-xl font-bold text-white border-b border-gray-800/80 pb-3">
            Order Summary
          </h2>

          <div className="space-y-4">
            <SummaryRow label="Total Orders" value={totalOrders} />

            <SummaryRow label="Place Orders" value={placeOrders} />

            <SummaryRow label="Pickedup Orders" value={pickedupOrders} />

            <SummaryRow label="Returned Orders" value={returnedOrders} />

            <SummaryRow
              label="Revenue"
              value={`৳ ${totalRevenue}`}
              color="text-emerald-400"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
          <h2 className="mb-6 text-lg sm:text-xl font-bold text-white border-b border-gray-800/80 pb-3">
            Inventory Overview
          </h2>

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
  badgeColor,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
  badgeColor?: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-gray-700 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-xl border ${
            badgeColor || "bg-gray-800/50 border-gray-700/50"
          } transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
        {value}
      </h2>

      <p className="mt-1 text-xs sm:text-sm font-medium text-gray-400">
        {title}
      </p>
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
    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-gray-900/40 border border-gray-800/40 transition-colors hover:bg-gray-900/80">
      <span className="text-xs sm:text-sm font-medium text-gray-300">
        {label}
      </span>

      <span
        className={`text-sm sm:text-base font-bold ${color || "text-white"}`}
      >
        {value}
      </span>
    </div>
  );
}
