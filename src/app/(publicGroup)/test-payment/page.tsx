"use client";

import { confirmPayment } from "../_actions/confirm-payment";

export default function TestPaymentPage() {
  const handleConfirm = async () => {
    const sessionId =
      "cs_test_a1rOAcybeGiuWRasythz3swHomiNZOMpZU3S76XJzusmcQk7FOggvbUkS8";

    const res = await confirmPayment(sessionId);

    if (res?.success) {
      alert("Order Status Updated to PAID!");
    } else {
      alert("Failed to update status");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="rounded-xl border bg-white p-8 text-center shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Payment Confirmation Test
        </h2>
        <button
          onClick={handleConfirm}
          className="rounded-md bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 transition-all"
        >
          Confirm & Mark as Paid
        </button>
      </div>
    </div>
  );
}
