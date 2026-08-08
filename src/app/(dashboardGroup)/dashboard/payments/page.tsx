/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { PaymentsGear } from "@/type/type-gear";
import { paymentsHistory } from "../../_actions/paymnetsHitory";

const PaymentsPage = async () => {
  let paymentsList: any[] = [];
  let isError = false;

  try {
    const result: PaymentsGear = await paymentsHistory();

    console.log("PAYMENTS DATA =", JSON.stringify(result, null, 2));

    paymentsList = result?.data || [];
  } catch (error) {
    console.error("Error fetching payment history:", error);
    isError = true;
  }

  // Error
  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-5 text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Failed to load payment history.
          </h2>

          <p className="mt-2 text-sm text-red-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment History</h1>

        <p className="mt-2 text-muted-foreground">
          View all my completed and pending payment records.
        </p>
      </div>

      {/* No Payment */}
      {paymentsList.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed">
          <div className="text-center">
            <h2 className="text-xl font-semibold">No Payment History Found</h2>

            <p className="mt-2 text-muted-foreground">
              You haven&apos;t made any payments yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full min-w-[1100px]">
            {/* Table Header */}
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left">SI</th>

                <th className="px-4 py-3 text-left">Gear Image</th>

                <th className="px-4 py-3 text-left">Gear Title</th>

                <th className="px-4 py-3 text-left">Customer Name</th>

                <th className="px-4 py-3 text-left">Payment ID</th>

                <th className="px-4 py-3 text-left">Rental ID</th>

                <th className="px-4 py-3 text-center">Amount</th>

                <th className="px-4 py-3 text-center">Payment Date</th>

                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {paymentsList.map((payment, index) => {
                const customer = payment.customer;
                const gear = payment.rentalOrder?.gearItem;

                return (
                  <tr
                    key={payment.id}
                    className="border-t transition hover:bg-muted/50"
                  >
                    {/* SI */}
                    <td className="px-4 py-4">{index + 1}</td>

                    {/* Gear Image */}
                    <td className="px-4 py-4">
                      {gear?.gearItemImage ? (
                        <Image
                          src={gear.gearItemImage}
                          alt={gear?.title || "Gear"}
                          width={50}
                          height={50}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                    </td>

                    {/* Gear Title */}
                    <td className="px-4 py-4">
                      <p className="font-medium">
                        {gear?.title || "Unknown Gear"}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium">
                          {customer?.name || "Unknown"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {customer?.email || "No email"}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4 font-mono text-xs">
                      {payment.id}
                    </td>

                    <td className="px-4 py-4 font-mono text-xs">
                      {payment.rentalOrderId}
                    </td>

                    <td className="px-4 py-4 text-center font-semibold text-green-600">
                      ৳ {payment.amount}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {payment.createdAt
                        ? new Date(payment.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          payment.status === "PAID"
                            ? "bg-green-100 text-green-700"
                            : payment.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : payment.status === "FAILED"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
