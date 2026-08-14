import Link from "next/link";
import FeaturedGearGrid from "./_components/featuredGear/gridFeatured";
import HeroSection from "./_components/heroSection/heroSection";
import WhyChooseGearUp from "./_components/whyChooseGearup/whyChooseGearup";
import HowGearUpWorks from "./_components/howGearUpWorks/howGearUpWorks";

export default async function HomePage() {
  return (
    <div>
      <main className="min-h-screen bg-[#0a0f1d] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 overflow-hidden relative">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />

          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[130px] rounded-full" />
          <div className="absolute top-2/3 -right-20 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 space-y-16 sm:space-y-24 md:space-y-20 pb-20 sm:pb-28">
          <HeroSection />

          <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center space-y-3 sm:mb-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-medium text-cyan-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                Top Rated Equipment
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                Featured{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Gears
                </span>
              </h2>

              <p className="mx-auto max-w-2xl text-sm text-slate-400 sm:text-base">
                Explore our handpicked collection of high-performance tools and
                equipment available for rent today.
              </p>
            </div>

            <FeaturedGearGrid />

            <div className="mt-12 text-center sm:mt-16">
              <Link href="/gears" className="btn-cyber">
                <span>Explore All Gears</span>
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <WhyChooseGearUp />
            </div>

            <HowGearUpWorks />
          </section>
        </div>
      </main>
    </div>
  );
}
