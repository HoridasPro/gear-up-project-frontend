import { Search, CalendarDays, CreditCard, PackageCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse Gear",
    description: "Explore our collection and find the perfect gear for you.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Select Dates",
    description: "Choose your preferred rental dates and quantity.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Pay Securely",
    description: "Complete your rental with a safe and secure payment.",
  },
  {
    number: "04",
    icon: PackageCheck,
    title: "Enjoy & Return",
    description: "Use your gear and return it when your rental period ends.",
  },
];

const HowGearUpWorks = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-10">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[130px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16 md:mb-20 space-y-3">
          {/* Decorative Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-medium text-cyan-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Simple & Easy
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            How{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              GearUp
            </span>{" "}
            Works
          </h2>

          <p className="mt-4 text-sm text-slate-400 sm:text-base leading-relaxed">
            Rent your favorite sports and outdoor gear in just a few simple
            steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative flex flex-col items-center text-center rounded-xl border-l-4 border-l-cyan-400 border-y border-r border-slate-800 bg-slate-950/80 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-l-cyan-300 hover:border-r-slate-700 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.25)] overflow-hidden"
              >
                {/* Connector Line for Desktop (lg screen) */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[calc(50%+40px)] top-11 hidden h-[2px] w-[calc(100%-80px)] bg-gradient-to-r from-cyan-500/40 to-slate-800 lg:block z-0 pointer-events-none" />
                )}

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

                {/* Icon Container */}
                <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-500/50 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                  <Icon className="h-7 w-7 transition-colors duration-300" />
                </div>

                {/* Step Number Tag */}
                <span className="relative z-10 inline-block rounded-md bg-slate-900 border border-slate-800 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-cyan-400 uppercase">
                  Step {step.number}
                </span>

                {/* Title */}
                <h3 className="relative z-10 mt-3 text-lg font-bold text-slate-100 transition-colors duration-200 group-hover:text-cyan-300">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowGearUpWorks;
