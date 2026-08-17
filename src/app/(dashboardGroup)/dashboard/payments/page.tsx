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
      <div className="flex min-h-[400px] items-center justify-center p-4">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-5 text-center backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-red-400">
            Failed to load payment history.
          </h2>

          <p className="mt-2 text-sm text-red-300">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden space-y-6 sm:space-y-8 text-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Payment History
        </h1>

        <p className="mt-1 text-xs text-gray-400 sm:mt-2 sm:text-sm md:text-base">
          View all my completed and pending payment records.
        </p>
      </div>

      {/* No Payment */}
      {paymentsList.length === 0 ? (
        <div className="w-full overflow-x-hidden flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-[#0b0f19]/80 p-6 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              No Payment History Found
            </h2>

            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              You haven&apos;t made any payments yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-800/80 bg-[#0b0f19]/80 shadow-2xl backdrop-blur-xl">
          <table className="w-full min-w-[900px] text-left text-xs sm:text-sm">
            {/* Table Header */}
            <thead className="border-b border-gray-800/80 bg-gray-900/60 text-gray-300">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-left">
                  SI
                </th>

                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-left">
                  Gear Image
                </th>

                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-left">
                  Gear Title
                </th>

                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-left">
                  Customer Name
                </th>

                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-left">
                  Payment ID
                </th>

                {/* <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-left">
                  Rental ID
                </th> */}

                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-center">
                  Amount
                </th>

                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-center whitespace-nowrap">
                  Payment Date
                </th>

                <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-center">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-800/60">
              {paymentsList.map((payment, index) => {
                const customer = payment.customer;
                const gear = payment.rentalOrder?.gearItem;

                return (
                  <tr
                    key={payment.id}
                    className="transition hover:bg-gray-800/40"
                  >
                    {/* SI */}
                    <td className="px-4 py-4 sm:px-6 text-gray-300">
                      {index + 1}
                    </td>

                    {/* Gear Image */}
                    <td className="px-4 py-4 sm:px-6">
                      {gear?.gearItemImage ? (
                        <Image
                          src={gear.gearItemImage}
                          alt={gear?.title || "Gear"}
                          width={50}
                          height={50}
                          className="h-12 w-12 rounded-xl object-cover ring-1 ring-gray-800"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900/80 ring-1 ring-gray-800 text-[10px] text-gray-500">
                          No Image
                        </div>
                      )}
                    </td>

                    {/* Gear Title */}
                    <td className="px-4 py-4 sm:px-6">
                      <p className="font-medium text-white">
                        {gear?.title || "Unknown Gear"}
                      </p>
                    </td>

                    <td className="px-4 py-4 sm:px-6">
                      <div>
                        <p className="font-medium text-white">
                          {customer?.name || "Unknown"}
                        </p>

                        <p className="text-xs text-gray-400">
                          {customer?.email || "No email"}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4 sm:px-6 font-mono text-xs text-gray-400">
                      {payment.id}
                    </td>

                    {/* <td className="px-4 py-4 sm:px-6 font-mono text-xs text-gray-400">
                      {payment.rentalOrderId}
                    </td> */}

                    <td className="px-4 py-4 sm:px-6 text-center font-semibold text-emerald-400 whitespace-nowrap">
                      ৳ {payment.amount}
                    </td>

                    <td className="px-4 py-4 sm:px-6 text-center text-gray-300 whitespace-nowrap">
                      {payment.createdAt
                        ? new Date(payment.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-4 py-4 sm:px-6 text-center whitespace-nowrap">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium border ${
                          payment.status === "PAID"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : payment.status === "PENDING"
                              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                              : payment.status === "CANCELLED"
                                ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                                : payment.status === "FAILED"
                                  ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                                  : "border-gray-500/30 bg-gray-500/10 text-gray-400"
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
