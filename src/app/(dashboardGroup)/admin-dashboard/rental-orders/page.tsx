import React from "react";
import Image from "next/image";
import { RentalResponse } from "@/type/type-gear";
import { getAdminOrdersDashboard } from "../../_actions/get-admin-orders";

const MyRentalsPage = async () => {
  const result: RentalResponse = await getAdminOrdersDashboard();
  const rentals = result?.data || [];

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PLACED":
        return "border-amber-500/20 bg-amber-500/10 text-amber-400";
      case "PICKEDUP":
        return "border-green-500/20 bg-green-500/10 text-green-400";
      case "RETURNED":
        return "border-gray-500/20 bg-gray-500/10 text-gray-400";
      case "PAID":
        return "border-purple-500/20 bg-purple-500/10 text-purple-400";
      case "CONFIRMED":
        return "border-blue-500/20 bg-blue-500/10 text-blue-400";
      case "CANCELLED":
        return "border-red-500/20 bg-red-500/10 text-red-400";
      default:
        return "border-slate-700 bg-slate-800/80 text-slate-300";
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Rental Orders
        </h1>
        <p className="text-sm text-slate-400">
          View and manage all of your rental orders.
        </p>
      </div>

      {rentals.length === 0 ? (
        <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/40 p-6 text-center backdrop-blur-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 ring-1 ring-slate-700/50">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-white">
            No Rentals Found
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            You havent rented any gear yet.
          </p>
        </div>
      ) : (
        <div className="w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 text-slate-100 shadow-xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th scope="col" className="px-4 py-4 text-center">
                    SI
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Gear Image
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Gear ID
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    Total Price
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    Start Date
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    End Date
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    UpdatedAt
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
                {rentals.map((rental, index) => (
                  <tr
                    key={rental.id}
                    className="transition-colors duration-150 ease-in-out hover:bg-slate-800/50"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-center text-xs font-medium text-slate-400">
                      {index + 1}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      {rental.gearItem?.gearItemImage ? (
                        <Image
                          src={rental.gearItem.gearItemImage}
                          alt={rental.gearItem?.title || "Gear"}
                          width={50}
                          height={50}
                          className="h-11 w-11 rounded-xl object-cover ring-2 ring-slate-700/80"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-[10px] font-medium text-slate-400 ring-2 ring-slate-700/80">
                          No Image
                        </div>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-slate-300">
                      {rental.gearItemId}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-center font-medium text-slate-200">
                      {rental.quantity}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-center font-semibold text-emerald-400">
                      ৳ {rental.totalPrice}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-center text-slate-400">
                      {new Date(rental.startDate).toLocaleDateString("en-GB")}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-center text-slate-400">
                      {new Date(rental.endDate).toLocaleDateString("en-GB")}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-center text-slate-400">
                      {new Date(rental.updatedAt).toLocaleDateString("en-GB")}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                          rental.status,
                        )}`}
                      >
                        {rental.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRentalsPage;
