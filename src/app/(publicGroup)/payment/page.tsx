/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { confirmPayment } from "../_actions/confirm-payment";

function PaymentContent() {
  const searchParams = useSearchParams();

  const isSuccess = searchParams.get("success") === "true";
  const isCanceled =
    searchParams.get("canceled") === "true" ||
    searchParams.get("cancel") === "true";
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleConfirmation = async () => {
      if (isCanceled) {
        setLoading(false);
        return;
      }

      if (isSuccess) {
        try {
          if (sessionId) {
            const res = await confirmPayment(sessionId);

            if (res?.success || res?.status === "success") {
              setConfirmed(true);
            } else {
              setErrorMessage(res?.message || "Failed to update database!");
            }
          } else {
            setConfirmed(true);
          }
        } catch (error: any) {
          console.error("Confirmation Error:", error);
          setErrorMessage(error.message || "Failed to confirm payment.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    handleConfirmation();
  }, [isSuccess, isCanceled, sessionId]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center  ">
        <div className="rounded-full bg-[#111C33] p-4 shadow-xl border border-slate-800">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        </div>
        <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium animate-pulse">
          Updating your order status to PAID, please wait...
        </p>
      </div>
    );
  }

  if (isCanceled) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12  ">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#111C33] p-6 sm:p-8 text-center shadow-2xl backdrop-blur-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20">
            <AlertCircle className="h-10 w-10 text-amber-400" />
          </div>
          <h1 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-cyan-400">
            Payment Canceled
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-400">
            You canceled the payment process. No money was deducted from your
            account.
          </p>
          <Link
            href="/dashboard/my-rentals"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-6 py-3.5 text-xl sm:text-base font-semibold text-black shadow-lg shadow-blue-600/25 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#111C33] transition-all duration-200"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess && confirmed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#111C33] p-6 sm:p-8 text-center shadow-2xl backdrop-blur-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          </div>
          <h1 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-cyan-400">
            Payment Successful!
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-400">
            Thank you! Your order has been marked as PAID in our system.
          </p>
          <Link
            href="/dashboard/payments"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-6 py-3.5 text-xl sm:text-base font-semibold text-black shadow-lg shadow-blue-600/25 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#111C33] transition-all duration-200"
          >
            View Payments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-[#0B1426]">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#111C33] p-6 sm:p-8 text-center shadow-2xl backdrop-blur-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20">
          <XCircle className="h-10 w-10 text-rose-400" />
        </div>
        <h1 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Payment Failed
        </h1>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-400">
          {errorMessage || "Could not confirm payment."}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-slate-800 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 shadow-md hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-[#111C33] transition-all duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center bg-[#0B1426]">
          <div className="rounded-full bg-[#111C33] p-4 shadow-xl border border-slate-800">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          </div>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
