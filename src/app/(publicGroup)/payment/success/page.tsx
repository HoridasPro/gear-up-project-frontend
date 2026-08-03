"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "N/A";

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="mt-2 text-sm text-gray-600">
          Your rental booking has been processed and confirmed via Stripe.
        </p>

        <div className="my-6 rounded-lg bg-gray-50 p-4 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Session ID:</span>
            <span className="max-w-[180px] truncate font-mono font-semibold text-gray-800 text-[10px]">
              {sessionId}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status:</span>
            <span className="font-semibold text-green-600">PAID & CONFIRMED</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Go to Customer Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center rounded-lg border py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}