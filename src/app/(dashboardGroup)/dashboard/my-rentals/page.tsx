import React from "react";
import Image from "next/image";
import { RentalResponse } from "@/type/type-gear";
import { getCustomerDashboard } from "../../_actions/get-rentals";
import ReviewButton from "../../_components/reviewButton";

const MyRentalsPage = async () => {
  const result: RentalResponse = await getCustomerDashboard();
  const rentals = result?.data || [];

  return (
    <div className="space-y-6 sm:space-y-8 text-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          My Rentals
        </h1>

        <p className="mt-1 text-xs text-gray-400 sm:mt-2 sm:text-sm md:text-base">
          View and manage all of my rental orders.
        </p>
      </div>

      {rentals.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-[#0b0f19]/80 p-6 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              No Rentals Found
            </h2>
            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              You havent rented any gear yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-800/80 bg-[#0b0f19]/80 shadow-2xl backdrop-blur-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-gray-800/80 bg-gray-900/60 text-gray-300">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-left">
                  SI
                </th>

                {/* Image added */}
                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-center">
                  Image
                </th>

                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-left">
                  Gear ID
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-center">
                  Quantity
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-center">
                  Total Price
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-center whitespace-nowrap">
                  Start Date
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-center whitespace-nowrap">
                  End Date
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-center">
                  Updated
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-center">
                  Status
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-center">
                  Review
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/60">
              {rentals.map((rental, index) => (
                <tr key={rental.id} className="transition hover:bg-gray-800/40">
                  <td className="px-4 py-4 sm:px-6 text-gray-300">
                    {index + 1}
                  </td>

                  {/* Gear Image */}
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex justify-center">
                      {rental.gearItem?.gearItemImage ? (
                        <Image
                          src={rental.gearItem.gearItemImage}
                          alt={rental.gearItem.title || "Gear"}
                          width={60}
                          height={60}
                          className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover ring-1 ring-gray-800"
                        />
                      ) : (
                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gray-900/80 ring-1 ring-gray-800 text-[10px] text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4 sm:px-6 font-mono text-xs text-gray-400">
                    {rental.gearItemId}
                  </td>

                  <td className="px-4 py-4 sm:px-6 text-center text-gray-200">
                    {rental.quantity}
                  </td>

                  <td className="px-4 py-4 sm:px-6 text-center font-semibold text-emerald-400 whitespace-nowrap">
                    ৳ {rental.totalPrice}
                  </td>

                  <td className="px-4 py-4 sm:px-6 text-center text-gray-300 whitespace-nowrap">
                    {new Date(rental.startDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4 sm:px-6 text-center text-gray-300 whitespace-nowrap">
                    {new Date(rental.endDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4 sm:px-6 text-center text-gray-400 whitespace-nowrap">
                    {new Date(rental.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4 sm:px-6 text-center whitespace-nowrap">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium border ${
                        rental.status === "PENDING"
                          ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                          : rental.status === "PICKEDUP"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : rental.status === "RETURNED"
                              ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                              : "border-rose-500/30 bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      {rental.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 sm:px-6 text-center whitespace-nowrap">
                    {rental.status === "RETURNED" && !rental.hasReview ? (
                      <ReviewButton
                        rentalOrderId={rental.id}
                        gearItemId={rental.gearItemId}
                      />
                    ) : rental.hasReview ? (
                      <span className="text-xs sm:text-sm font-medium text-emerald-400">
                        Reviewed
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">
                        Not available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRentalsPage;
