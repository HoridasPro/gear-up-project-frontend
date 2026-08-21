"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createPaymentAction } from "../../_actions/createPaymentAction";

type PayNowButtonProps = {
  rentalOrderId: string;
};

export default function PayNowButton({ rentalOrderId }: PayNowButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!rentalOrderId) {
      toast.error("Rental order ID not found.");
      return;
    }

    try {
      setLoading(true);

      const result = await createPaymentAction(rentalOrderId);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to create payment session");
      }

      const checkoutUrl =
        result?.data?.url ||
        result?.url ||
        result?.data?.paymentUrl ||
        result?.paymentUrl ||
        result?.data?.checkoutUrl ||
        result?.checkoutUrl ||
        result?.data?.sessionUrl ||
        (typeof result?.data === "string" ? result.data : null);

      if (!checkoutUrl) {
        throw new Error("Stripe payment URL not found");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Payment error:", error);

      toast.error(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-cyan-400 px-3 py-2 text-xs font-semibold text-black transition-all hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-1.5 h-4 w-4" />
          Pay Now
        </>
      )}
    </button>
  );
}
