import React from "react";
import { RentalResponse } from "@/type/type-gear";
import { getAdminOrdersDashboard } from "../../_actions/get-admin-orders";

const MyRentalsPage = async () => {
  const result: RentalResponse = await getAdminOrdersDashboard();
  const rentals = result?.data || [];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Rentals</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage all of your rental orders.
        </p>
      </div>

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
                <th className="px-4 py-3 text-left">Gear ID</th>
                <th className="px-4 py-3 text-center">Quantity</th>
                <th className="px-4 py-3 text-center">Total Price</th>
                <th className="px-4 py-3 text-center">Start Date</th>
                <th className="px-4 py-3 text-center">End Date</th>
                <th className="px-4 py-3 text-center">Order Date</th>
                <th className="px-4 py-3 text-center">Updated</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {rentals.map((rental, index) => (
                <tr
                  key={rental.id}
                  className="border-t hover:bg-muted/50 transition"
                >
                  <td className="px-4 py-4">{index + 1}</td>

                  <td className="px-4 py-4 font-mono text-xs">
                    {rental.gearItemId.slice(0, 10)}...
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
                    {new Date(rental.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {new Date(rental.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4 text-center">
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
  );
};

export default MyRentalsPage;
