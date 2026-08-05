 /* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentsGear } from "@/type/type-gear";
import { paymentsHistory } from "../../_actions/paymnetsHitory";

const PaymentsPage = async () => {
  let paymentsList: any[] = [];
  let isError = false;

  // ১. শুধুমাত্র API call টুকু try/catch-এর মধ্যে থাকবে
  try {
    const result: PaymentsGear = await paymentsHistory();
    paymentsList = result?.data || [];
  } catch (error) {
    console.error("Error fetching payment history:", error);
    isError = true;
  }

  // ২. কোনো সমস্যা বা এরর হলে এই মেসেজ দেখাবে (try/catch-এর বাইরে)
  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg font-medium text-red-500">
          Failed to load payment history.
        </p>
      </div>
    );
  }

  // ৩. মূল টেবিল ও ডিজাইন রেন্ডার হবে (try/catch-এর বাইরে)
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Payment History</h1>
        <p className="mt-2 text-muted-foreground">
          View all your completed and pending payment records.
        </p>
      </div>

      {paymentsList.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed">
          <div className="text-center">
            <h2 className="text-xl font-semibold">No Payment History Found</h2>
            <p className="mt-2 text-muted-foreground">
              You havent made any payments yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left">SI</th>
                <th className="px-4 py-3 text-left">Payment ID</th>
                <th className="px-4 py-3 text-left">Rental ID</th>
                <th className="px-4 py-3 text-center">Amount</th>
                <th className="px-4 py-3 text-center">Payment Date</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {paymentsList.map((payment, index) => (
                <tr
                  key={payment.id}
                  className="border-t transition hover:bg-muted/50"
                >
                  <td className="px-4 py-4">{index + 1}</td>

                  <td className="px-4 py-4 font-mono text-xs">
                    {payment.id?.slice(0, 10)}...
                  </td>

                  <td className="px-4 py-4 font-mono text-xs">
                    {payment.rentalOrderId?.slice(0, 10)}...
                  </td>

                  <td className="px-4 py-4 text-center font-semibold text-green-600">
                    ৳ {payment.amount}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {new Date(payment.createdAt).toLocaleDateString()}
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
