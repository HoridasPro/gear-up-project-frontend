/* eslint-disable @typescript-eslint/no-explicit-any */

import { Package, Clock3, CheckCircle2, RotateCcw } from "lucide-react";
import { getCustomerDashboard } from "../_actions/get-rentals";
import CustomerPieChart from "../_components/customerPaichart";

const CustomerDashboard = async () => {
  const result = await getCustomerDashboard();

  const rentals = result?.data || [];

  const totalRentals = rentals.length;

  const placeRentals = rentals.filter(
    (item: any) => item.status === "PLACED",
  ).length;

  const pickedupRentals = rentals.filter(
    (item: any) => item.status === "PICKEDUP",
  ).length;

  const returnedRentals = rentals.filter(
    (item: any) => item.status === "RETURNED",
  ).length;

  return (
    <div className="space-y-6 sm:space-y-8 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Customer Dashboard
        </h1>
        <p className="mt-1 text-xs text-gray-400 sm:mt-2 sm:text-sm md:text-base">
          Welcome back! Heres an overview of my rental activities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-800/80 bg-[#0b0f19]/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6 transition duration-300 hover:border-blue-500/40">
          <Package className="mb-3 h-8 w-8 text-blue-500 sm:mb-4 sm:h-10 sm:w-10" />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {totalRentals}
          </h2>
          <p className="text-xs text-gray-400 sm:text-sm">Total Rentals</p>
        </div>

        <div className="rounded-2xl border border-gray-800/80 bg-[#0b0f19]/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6 transition duration-300 hover:border-yellow-500/40">
          <Clock3 className="mb-3 h-8 w-8 text-yellow-500 sm:mb-4 sm:h-10 sm:w-10" />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {placeRentals}
          </h2>
          <p className="text-xs text-gray-400 sm:text-sm">Place Rentals</p>
        </div>

        <div className="rounded-2xl border border-gray-800/80 bg-[#0b0f19]/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6 transition duration-300 hover:border-green-500/40">
          <CheckCircle2 className="mb-3 h-8 w-8 text-green-500 sm:mb-4 sm:h-10 sm:w-10" />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {pickedupRentals}
          </h2>
          <p className="text-xs text-gray-400 sm:text-sm">PickedUp Rentals</p>
        </div>

        <div className="rounded-2xl border border-gray-800/80 bg-[#0b0f19]/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6 transition duration-300 hover:border-purple-500/40">
          <RotateCcw className="mb-3 h-8 w-8 text-purple-500 sm:mb-4 sm:h-10 sm:w-10" />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {returnedRentals}
          </h2>
          <p className="text-xs text-gray-400 sm:text-sm">Returned Rentals</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-800/80 bg-[#0b0f19]/80 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
        <CustomerPieChart
          place={placeRentals}
          pickedup={pickedupRentals}
          returned={returnedRentals}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-800/80 bg-[#0b0f19]/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-white sm:mb-6 sm:text-xl">
            Rental Summary
          </h2>

          <div className="space-y-4 text-xs sm:space-y-5 sm:text-sm">
            <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
              <span className="text-gray-400">Total Rentals</span>
              <span className="font-bold text-blue-400">{totalRentals}</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
              <span className="text-gray-400">Place Rentals</span>
              <span className="font-bold text-yellow-400">{placeRentals}</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
              <span className="text-gray-400">PickedUp Rentals</span>
              <span className="font-bold text-green-400">
                {pickedupRentals}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-gray-400">Returned Rentals</span>
              <span className="font-bold text-purple-400">
                {returnedRentals}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-800/80 bg-[#0b0f19]/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-white sm:mb-6 sm:text-xl">
            Account Overview
          </h2>

          <div className="space-y-4 text-xs sm:space-y-5 sm:text-sm">
            <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
              <span className="text-gray-400">Active Rentals</span>
              <span className="font-semibold text-white">
                {placeRentals + pickedupRentals}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
              <span className="text-gray-400">Completed Rentals</span>
              <span className="font-semibold text-white">
                {returnedRentals}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
              <span className="text-gray-400">Completion Rate</span>
              <span className="font-semibold text-green-400">
                {totalRentals
                  ? `${Math.round((returnedRentals / totalRentals) * 100)}%`
                  : "0%"}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
              <span className="text-gray-400">Account Status</span>

              <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400 sm:px-3 sm:py-1">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-gray-400">Latest Activity</span>
              <span className="font-semibold text-white">
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
