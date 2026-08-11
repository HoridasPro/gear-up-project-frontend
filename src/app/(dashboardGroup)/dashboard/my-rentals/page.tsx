import React from "react";
import Image from "next/image";
import { RentalResponse } from "@/type/type-gear";
import { getCustomerDashboard } from "../../_actions/get-rentals";
import ReviewButton from "../../_components/reviewButton";
// import ReviewButton from "../../_components/reviewButton";

const MyRentalsPage = async () => {
  const result: RentalResponse = await getCustomerDashboard();
  const rentals = result?.data || [];

  return (
    <div>
      {/* Header */}

      <h1 className="text-3xl font-bold">My Rentals</h1>

      <p className="mt-2 text-muted-foreground">
        View and manage all of my rental orders.
      </p>

      {rentals.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed">
          <div className="text-center">
            <h2 className="text-xl font-semibold">No Rentals Found</h2>
            <p className="mt-2 text-muted-foreground">
              You havent rented any gear yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left">SI</th>

                {/* Image added */}
                <th className="px-4 py-3 text-center">Image</th>

                <th className="px-4 py-3 text-left">Gear ID</th>
                <th className="px-4 py-3 text-center">Quantity</th>
                <th className="px-4 py-3 text-center">Total Price</th>
                <th className="px-4 py-3 text-center">Start Date</th>
                <th className="px-4 py-3 text-center">End Date</th>
                <th className="px-4 py-3 text-center">Updated</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Review</th>
              </tr>
            </thead>

            <tbody>
              {rentals.map((rental, index) => (
                <tr
                  key={rental.id}
                  className="border-t hover:bg-muted/50 transition"
                >
                  <td className="px-4 py-4">{index + 1}</td>

                  {/* Gear Image */}
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      {rental.gearItem?.gearItemImage ? (
                        <Image
                          src={rental.gearItem.gearItemImage}
                          alt={rental.gearItem.title || "Gear"}
                          width={60}
                          height={60}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4 font-mono text-xs">
                    {rental.gearItemId}
                  </td>

                  <td className="px-4 py-4 text-center">{rental.quantity}</td>

                  <td className="px-4 py-4 text-center font-semibold text-green-600">
                    ৳ {rental.totalPrice}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {new Date(rental.startDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {new Date(rental.endDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {new Date(rental.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        rental.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : rental.status === "PICKEDUP"
                            ? "bg-green-100 text-green-700"
                            : rental.status === "RETURNED"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {rental.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {rental.status === "RETURNED" && !rental.hasReview ? (
                      <ReviewButton gearItemId={rental.gearItemId} />
                    ) : rental.hasReview ? (
                      <span className="text-sm text-green-600">Reviewed</span>
                    ) : (
                      <span className="text-xs text-gray-400">
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
