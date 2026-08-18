"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
  unstable_retry?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    if (unstable_retry) {
      unstable_retry();
    } else if (reset) {
      reset();
    }
  };

  return (
    <div className="min-h-[100svh] w-full bg-[#0a0d14] flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#0284c725,transparent_60%)] pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-sky-500/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="absolute bottom-0 inset-x-0 h-1/2 [perspective:1000px] pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#0284c720_1px,transparent_1px),linear-gradient(to_bottom,#0284c720_1px,transparent_1px)] bg-[size:3rem_3rem]"
          style={{ transform: "rotateX(75deg)", transformOrigin: "top center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0a0d14]/80 to-[#0a0d14]" />
      </div>

      <div className="relative w-full max-w-[92%] xs:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl text-center space-y-6 sm:space-y-8 bg-[#111622]/60 backdrop-blur-xl p-6 xs:p-8 sm:p-12 rounded-3xl border border-sky-500/30 shadow-[0_0_50px_rgba(2,132,199,0.15)] transition-all duration-300 z-10">
        <div className="absolute top-8 left-12 w-1.5 h-1.5 bg-sky-300 rounded-full blur-[1px] animate-pulse" />
        <div className="absolute top-14 right-16 w-2 h-2 bg-sky-400 rounded-full blur-[1px] animate-pulse" />
        <div className="absolute bottom-10 left-20 w-1 h-1 bg-sky-200 rounded-full blur-[0.5px]" />

        <div className="relative py-2 flex justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-sky-500/10 border border-sky-500/40 flex items-center justify-center shadow-[0_0_35px_rgba(56,189,248,0.4)]">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Something <span className="text-sky-400">went wrong!</span>
          </h2>
          <p className="text-xs xs:text-sm md:text-base text-slate-400 leading-relaxed max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            An unexpected error occurred while loading this resource.
            {error.digest && (
              <span className="block mt-2 text-xs font-mono text-sky-400/80">
                Digest: {error.digest}
              </span>
            )}
          </p>
        </div>

        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRetry}
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-xs xs:text-sm md:text-base font-semibold text-white bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-full hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[#0a0d14] transition-all duration-300 shadow-[0_0_25px_rgba(14,165,233,0.5)] hover:shadow-[0_0_35px_rgba(14,165,233,0.8)] active:scale-[0.97] cursor-pointer"
          >
            <span>Try again</span>

            <svg
              className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
