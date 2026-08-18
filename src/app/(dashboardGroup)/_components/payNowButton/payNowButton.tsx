"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

type PayNowButtonProps = {
  rentalOrderId: string;
};

export default function PayNowButton({ rentalOrderId }: PayNowButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payments/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rentalOrderId,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to create payment session");
      }

      const checkoutUrl =
        data?.data?.url ||
        data?.url ||
        data?.data?.paymentUrl ||
        data?.paymentUrl ||
        data?.data?.checkoutUrl ||
        data?.checkoutUrl ||
        data?.data?.sessionUrl ||
        (typeof data?.data === "string" ? data.data : null);

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
      className="inline-flex items-center justify-center rounded-lg bg-cyan-400 hover:bg-cyan-500 px-3 py-2 text-xs font-semibold text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
