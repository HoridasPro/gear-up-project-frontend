"use client";

import Link from "next/link";
import { XCircle, RefreshCw, ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <XCircle className="h-10 w-10" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Payment Cancelled</h1>
        <p className="mt-2 text-sm text-gray-600">
          You cancelled the Stripe checkout process. No amount was charged.
        </p>

        <div className="my-6 rounded-lg bg-red-50 p-4 text-xs text-red-700">
          If this was a mistake, you can return to the checkout page and try again.
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center rounded-lg border py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}