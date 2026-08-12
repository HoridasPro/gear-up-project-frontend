import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[100svh] w-full bg-[#0a0d14] flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans">
      {/* 1. Background Atmosphere & Ambient Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#0284c725,transparent_60%)] pointer-events-none" />

      {/* 2. Glowing Blue Spheres in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-sky-500/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* 3. 3D Perspective Grid Floor (Images style) */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 [perspective:1000px] pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#0284c720_1px,transparent_1px),linear-gradient(to_bottom,#0284c720_1px,transparent_1px)] bg-[size:3rem_3rem]"
          style={{ transform: "rotateX(75deg)", transformOrigin: "top center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0a0d14]/80 to-[#0a0d14]" />
      </div>

      {/* 4. Main Glassmorphism Card */}
      <div className="relative w-full max-w-[92%] xs:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl text-center space-y-6 sm:space-y-8 bg-[#111622]/60 backdrop-blur-xl p-6 xs:p-8 sm:p-12 rounded-3xl border border-sky-500/30 shadow-[0_0_50px_rgba(2,132,199,0.15)] transition-all duration-300 z-10">
        {/* Floating Light Sparkles */}
        <div className="absolute top-8 left-12 w-1.5 h-1.5 bg-sky-300 rounded-full blur-[1px] animate-pulse" />
        <div className="absolute top-14 right-16 w-2 h-2 bg-sky-400 rounded-full blur-[1px] animate-pulse" />
        <div className="absolute bottom-10 left-20 w-1 h-1 bg-sky-200 rounded-full blur-[0.5px]" />

        {/* 404 Glowing Outline Text */}
        <div className="relative py-2">
          <h1 className="text-7xl xs:text-8xl sm:text-9xl md:text-[10rem] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-sky-200 via-sky-400 to-sky-600 select-none drop-shadow-[0_0_35px_rgba(56,189,248,0.8)]">
            404
          </h1>
        </div>

        {/* Text Content */}
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Oops! Page <span className="text-sky-400">Not Found</span>
          </h2>
          <p className="text-xs xs:text-sm md:text-base text-slate-400 leading-relaxed max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            The requested resource could not be found.
            <br className="hidden sm:inline" />
            Let’s get you back on track.
          </p>
        </div>

        {/* Blue Neon Glass Button */}
        <div className="pt-2 sm:pt-4">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs xs:text-sm md:text-base font-semibold text-white bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-full hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[#0a0d14] transition-all duration-300 shadow-[0_0_25px_rgba(14,165,233,0.5)] hover:shadow-[0_0_35px_rgba(14,165,233,0.8)] active:scale-[0.97]"
          >
            <span>Back Home</span>
            {/* Arrow Up-Right Icon */}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M7 17L17 7M17 7H8M17 7V16"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
