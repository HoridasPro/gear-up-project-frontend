import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0a0d14] text-white font-sans min-h-[100svh] flex items-center justify-center">
      {/* Background Atmosphere & Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#0284c720,transparent_60%)]" />

      {/* 3D Grid Floor Effect */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 [perspective:1000px] pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:3rem_3rem]"
          style={{ transform: "rotateX(75deg)", transformOrigin: "top center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0a0d14]/80 to-[#0a0d14]" />
      </div>

      {/* Background Spheres */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-sky-500/20 blur-[120px] sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px] sm:h-96 sm:w-96" />

      {/* Floating Sparkles */}
      <div className="absolute top-12 left-10 w-1.5 h-1.5 bg-sky-300 rounded-full blur-[1px] animate-pulse pointer-events-none" />
      <div className="absolute top-20 right-20 w-2 h-2 bg-sky-400 rounded-full blur-[1px] animate-pulse pointer-events-none" />

      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-4 xs:px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20 z-10">
        {/* ================= LEFT CONTENT ================= */}
        <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-[#111622]/60 px-3 py-1.5 text-xs text-sky-200 backdrop-blur-xl shadow-[0_0_15px_rgba(2,132,199,0.15)] sm:px-4 sm:py-2 sm:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Premium Sports & Outdoor Gear Rental</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl xs:text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-white">
            Rent Sports & Outdoor
            <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-200 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
              Gear Instantly
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-xl text-xs xs:text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 md:text-lg lg:mx-0">
            Explore high-quality sports and outdoor equipment for your next
            adventure. Rent the gear you need, choose your dates, and enjoy
            hassle-free rentals at affordable prices.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/gears"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 px-6 py-3.5 text-xs xs:text-sm md:text-base font-semibold text-white shadow-[0_0_25px_rgba(14,165,233,0.4)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_35px_rgba(14,165,233,0.7)] active:scale-[0.98] sm:w-auto"
            >
              Browse Gears
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-full border border-sky-500/30 bg-[#111622]/60 px-6 py-3.5 text-xs xs:text-sm md:text-base font-semibold text-sky-100 backdrop-blur-md transition-all duration-300 hover:border-sky-400 hover:bg-sky-500/10 active:scale-[0.98] sm:w-auto"
            >
              Get Started
            </Link>
          </div>

          {/* Features */}
          <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-4 sm:grid-cols-3 lg:mx-0 lg:max-w-none">
            {/* Feature 1 */}
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
              <span className="text-xs xs:text-sm text-slate-300">
                Easy Booking
              </span>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <ShieldCheck className="h-5 w-5 shrink-0 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
              <span className="text-xs xs:text-sm text-slate-300">
                Secure Payment
              </span>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <Zap className="h-5 w-5 shrink-0 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
              <span className="text-xs xs:text-sm text-slate-300">
                Quick Rental
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative mx-auto w-full max-w-xl px-2 sm:px-6 lg:px-0">
          {/* Main Image Container */}
          <div className="relative h-[320px] xs:h-[360px] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-sky-500/30 bg-[#111622]/60 shadow-[0_0_50px_rgba(2,132,199,0.2)] backdrop-blur-xl sm:h-[430px] md:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5"
              alt="Sports and outdoor gear"
              fill
              priority
              unoptimized
              className="object-cover"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/30 to-transparent" />

            {/* Bottom Card */}
            <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-sky-500/30 bg-[#111622]/80 p-3 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] sm:bottom-5 sm:left-5 sm:right-5 sm:rounded-2xl sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 sm:text-sm">
                    Ready for your next adventure?
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-white sm:text-base">
                    Find your perfect gear
                  </p>
                </div>

                <Link
                  href="/gears"
                  aria-label="Browse gears"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all hover:brightness-110 active:scale-95 sm:h-11 sm:w-11"
                >
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ================= FLOATING STATS ================= */}

          {/* Sports Gears Card */}
          <div className="absolute -bottom-4 left-0 rounded-xl sm:rounded-2xl border border-sky-500/30 bg-[#111622]/90 backdrop-blur-xl px-3 py-2 text-white shadow-[0_0_25px_rgba(2,132,199,0.2)] sm:-left-3 sm:px-4 sm:py-3 md:-left-6">
            <p className="text-base font-extrabold text-sky-400 sm:text-2xl drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              100+
            </p>
            <p className="text-[10px] text-slate-400 sm:text-xs">
              Sports Gears
            </p>
          </div>

          {/* Rating Card */}
          <div className="absolute right-0 top-5 rounded-xl sm:rounded-2xl border border-sky-500/30 bg-[#111622]/90 backdrop-blur-xl px-3 py-2 text-white shadow-[0_0_25px_rgba(2,132,199,0.2)] sm:right-0 sm:px-4 sm:py-3 md:-right-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm sm:text-base text-amber-400">★</span>
              <span className="text-xs font-bold sm:text-base text-sky-100">
                4.9
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
              Customer Rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
