"use client";

import { CheckCircle2, Home, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RentalConfirmPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 text-slate-100">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-slate-800 bg-[#0f172a]/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="h-12 w-12 text-emerald-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Rental Request Placed!
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm sm:text-base leading-6 text-slate-400">
            Your rental request has been successfully placed. Please wait for
            the provider to confirm your request.
          </p>

          {/* Status */}
          <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Current Status
            </p>

            <p className="mt-1 text-lg font-bold text-yellow-400">PLACED</p>
          </div>

          {/* Payment Information */}
          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm text-slate-300">
              💳 Payment is not required yet.
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Once the provider confirms your rental, the{" "}
              <span className="text-cyan-400 font-medium">Pay Now</span> button
              will appear in your My Rentals page.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {/* My Rentals */}
            <button
              onClick={() => router.push("/dashboard/my-rentals")}
              className="w-full flex items-center justify-center rounded-xl bg-cyan-400 hover:bg-cyan-500 active:scale-[0.99] py-3.5 px-4 font-semibold text-black shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              View My Rentals
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full flex items-center justify-center rounded-xl bg-slate-800/80 hover:bg-slate-700 py-3.5 px-4 font-medium text-slate-300 border border-slate-700 transition-all cursor-pointer"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            You will be able to make payment after provider confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
