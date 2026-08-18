import React from "react";
import { Loader2 } from "lucide-react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-[#0b1320]/80 backdrop-blur-md px-4">
      <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-800 bg-[#131f33] px-8 py-10 shadow-2xl shadow-black/50 sm:px-12">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full bg-blue-500/20 blur-xl animate-pulse" />

          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            Loading, please wait...
          </h3>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Fetching the latest data for you
          </p>
        </div>

        <div className="mt-6 h-1.5 w-36 overflow-hidden rounded-full bg-slate-800 sm:w-48">
          <div className="h-full w-full origin-left-right animate-[pulse_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
