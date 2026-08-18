"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
    alt: "Sports and outdoor gear",
    title: "Find your perfect gear",
    subtitle: "Ready for your next adventure?",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
    alt: "Camping equipment in nature",
    title: "Premium Camping Equipment",
    subtitle: "Explore the wild with confidence",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd",
    alt: "Athletic and fitness accessories",
    title: "High Performance Fitness Gear",
    subtitle: "Level up your workout routine",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b",
    alt: "Mountain trekking backpack and hiking gear",
    title: "Mountain & Hiking Essentials",
    subtitle: "Conquer new heights effortlessly",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0d14] text-white font-sans min-h-[100svh] flex items-center justify-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#0284c720,transparent_60%)]" />

      <div className="absolute bottom-0 inset-x-0 h-1/2 [perspective:1000px] pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:3rem_3rem]"
          style={{ transform: "rotateX(75deg)", transformOrigin: "top center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0a0d14]/80 to-[#0a0d14]" />
      </div>

      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-sky-500/20 blur-[120px] sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px] sm:h-96 sm:w-96" />

      <div className="absolute top-12 left-10 w-1.5 h-1.5 bg-sky-300 rounded-full blur-[1px] animate-pulse pointer-events-none" />
      <div className="absolute top-20 right-20 w-2 h-2 bg-sky-400 rounded-full blur-[1px] animate-pulse pointer-events-none" />

      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-4 xs:px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20 z-10">
        <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-[#111622]/60 px-3 py-1.5 text-xs text-sky-200 backdrop-blur-xl shadow-[0_0_15px_rgba(2,132,199,0.15)] sm:px-4 sm:py-2 sm:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Premium Sports & Outdoor Gear Rental</span>
          </div>

          <h1 className="text-3xl xs:text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-white">
            Rent Sports & Outdoor
            <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-200 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
              Gear Instantly
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-xs xs:text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 md:text-lg lg:mx-0">
            Explore high-quality sports and outdoor equipment for your next
            adventure. Rent the gear you need, choose your dates, and enjoy
            hassle-free rentals at affordable prices.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/gears" className="btn-cyber">
              Browse Gears
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link href="/register" className="btn-cyber">
              Get Started
            </Link>
          </div>

          <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-4 sm:grid-cols-3 lg:mx-0 lg:max-w-none">
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
              <span className="text-xs xs:text-sm text-slate-300">
                Easy Booking
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <ShieldCheck className="h-5 w-5 shrink-0 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
              <span className="text-xs xs:text-sm text-slate-300">
                Secure Payment
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <Zap className="h-5 w-5 shrink-0 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
              <span className="text-xs xs:text-sm text-slate-300">
                Quick Rental
              </span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl px-2 sm:px-6 lg:px-0">
          <div className="relative h-[320px] xs:h-[360px] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-sky-500/30 bg-[#111622]/60 shadow-[0_0_50px_rgba(2,132,199,0.2)] backdrop-blur-xl sm:h-[430px] md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[currentSlide].id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].alt}
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/30 to-transparent pointer-events-none" />

            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-sky-500/30 bg-[#111622]/60 text-white backdrop-blur-md transition-all hover:bg-sky-500/30 active:scale-95 sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-sky-500/30 bg-[#111622]/60 text-white backdrop-blur-md transition-all hover:bg-sky-500/30 active:scale-95 sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-6 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                      : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-3 left-3 right-3 z-20 rounded-xl border border-sky-500/30 bg-[#111622]/80 p-3 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] sm:bottom-5 sm:left-5 sm:right-5 sm:rounded-2xl sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 sm:text-sm">
                    {slides[currentSlide].subtitle}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-white sm:text-base">
                    {slides[currentSlide].title}
                  </p>
                </div>

                <Link
                  href="/gears"
                  aria-label="Browse gears"
                  className="btn-cyber"
                >
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 left-0 z-20 rounded-xl sm:rounded-2xl border border-sky-500/30 bg-[#111622]/90 backdrop-blur-xl px-3 py-2 text-white shadow-[0_0_25px_rgba(2,132,199,0.2)] sm:-left-3 sm:px-4 sm:py-3 md:-left-6">
            <p className="text-base font-extrabold text-sky-400 sm:text-2xl drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              100+
            </p>
            <p className="text-[10px] text-slate-400 sm:text-xs">
              Sports Gears
            </p>
          </div>

          <div className="absolute right-0 top-5 z-20 rounded-xl sm:rounded-2xl border border-sky-500/30 bg-[#111622]/90 backdrop-blur-xl px-3 py-2 text-white shadow-[0_0_25px_rgba(2,132,199,0.2)] sm:right-0 sm:px-4 sm:py-3 md:-right-4">
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
