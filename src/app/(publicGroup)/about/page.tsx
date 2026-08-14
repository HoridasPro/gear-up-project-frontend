import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Package,
  Heart,
  Target,
  Sparkles,
  CheckCircle2,
  Handshake,
  CircleDollarSign,
  Headphones,
  Leaf,
  Zap,
} from "lucide-react";

const AboutPage = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0d14] text-white">
      {/* =====================================================
          1. ABOUT GEARUP / WHO WE ARE
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-sky-500/10">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-sky-500/5 blur-3xl sm:h-80 sm:w-80" />

        <div className="pointer-events-none absolute -right-32 top-40 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl sm:h-80 sm:w-80" />

        <div className="container relative mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs text-sky-400 sm:px-4 sm:py-2 sm:text-sm">
                <Sparkles className="h-4 w-4" />
                About GearUp
              </div>

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
                Your Adventure Starts With{" "}
                <span className="text-sky-400">GearUp</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 lg:mx-0 lg:text-lg">
                GearUp is a sports and outdoor gear rental platform built for
                people who love adventure, fitness, and outdoor activities.
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 lg:mx-0">
                Instead of spending a large amount of money buying equipment
                that you may only use occasionally, GearUp lets you rent the
                right gear whenever you need it.
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 lg:mx-0">
                From cycling and camping to fitness and water sports, we make
                finding and renting quality equipment simple, convenient, and
                affordable.
              </p>

              {/* Features */}
              <div className="mx-auto mt-7 grid max-w-xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:mx-0">
                {[
                  "Quality Equipment",
                  "Affordable Rentals",
                  "Easy Booking",
                  "Trusted Service",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Cards */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-sky-500/5 blur-2xl" />

              <div className="relative grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-4">
                <div className="rounded-2xl border border-sky-500/20 bg-[#111622]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 sm:p-6">
                  <Package className="mb-4 h-7 w-7 text-sky-400 sm:h-8 sm:w-8" />

                  <h3 className="text-lg font-bold sm:text-xl">Quality Gear</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Reliable equipment for your favorite activities.
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-500/20 bg-[#111622]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 sm:p-6">
                  <Users className="mb-4 h-7 w-7 text-sky-400 sm:h-8 sm:w-8" />

                  <h3 className="text-lg font-bold sm:text-xl">Community</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Connecting adventurers with the right gear.
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-500/20 bg-[#111622]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 sm:p-6">
                  <ShieldCheck className="mb-4 h-7 w-7 text-sky-400 sm:h-8 sm:w-8" />

                  <h3 className="text-lg font-bold sm:text-xl">Trusted</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    A secure and reliable rental experience.
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-500/20 bg-[#111622]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 sm:p-6">
                  <Heart className="mb-4 h-7 w-7 text-sky-400 sm:h-8 sm:w-8" />

                  <h3 className="text-lg font-bold sm:text-xl">Adventure</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Built for people who love exploring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. OUR MISSION
      ====================================================== */}
      <section className="border-b border-sky-500/10 bg-[#0d111a]">
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 sm:h-14 sm:w-14">
              <Target className="h-6 w-6 text-sky-400 sm:h-7 sm:w-7" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 sm:text-sm">
              Our Mission
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              Making Adventure <span className="text-sky-400">Accessible</span>
            </h2>

            <p className="mt-5 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              Our mission is to make sports and outdoor activities accessible to
              everyone by providing quality equipment without the high cost of
              ownership.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              We want every customer to have the freedom to try new activities,
              explore new places, and enjoy their favorite sports with the right
              equipment.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {[
              {
                icon: CircleDollarSign,
                title: "Affordable",
                text: "Rent instead of buying expensive equipment.",
              },
              {
                icon: Zap,
                title: "Convenient",
                text: "Find and rent your gear with minimal effort.",
              },
              {
                icon: ShieldCheck,
                title: "Reliable",
                text: "Enjoy a safe and dependable rental experience.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-sky-500/15 bg-[#111622]/60 p-5 text-center sm:p-6"
                >
                  <Icon className="mx-auto mb-4 h-7 w-7 text-sky-400" />

                  <h3 className="text-lg font-semibold">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          3. OUR VISION
      ====================================================== */}
      <section className="border-b border-sky-500/10">
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Vision Content */}
            <div className="text-center lg:text-left">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 lg:mx-0 sm:h-14 sm:w-14">
                <Sparkles className="h-6 w-6 text-sky-400 sm:h-7 sm:w-7" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 sm:text-sm">
                Our Vision
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                A World Where{" "}
                <span className="text-sky-400">Everyone Can Explore</span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 lg:mx-0">
                We envision a future where people do not need to own expensive
                equipment to experience the activities they love.
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 lg:mx-0">
                GearUp aims to build a trusted rental community where customers
                can easily discover equipment and providers can share their gear
                with people who need it.
              </p>
            </div>

            {/* Vision Card */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="pointer-events-none absolute -inset-5 rounded-3xl bg-sky-500/5 blur-3xl" />

              <div className="relative rounded-3xl border border-sky-500/20 bg-[#111622]/80 p-5 shadow-[0_0_40px_rgba(2,132,199,0.08)] sm:p-8">
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 sm:h-11 sm:w-11">
                      <Users className="h-5 w-5 text-sky-400" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold sm:text-base">
                        Stronger Adventure Community
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                        Bringing customers and gear providers together.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 sm:h-11 sm:w-11">
                      <Package className="h-5 w-5 text-sky-400" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold sm:text-base">
                        More Accessible Gear
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                        Making quality equipment easier to access.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 sm:h-11 sm:w-11">
                      <Leaf className="h-5 w-5 text-sky-400" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold sm:text-base">
                        Smarter Consumption
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                        Encouraging rental and shared use over unnecessary
                        ownership.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. WHY CHOOSE GEARUP
      ====================================================== */}
      <section className="border-b border-sky-500/10 bg-[#0d111a]">
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 sm:text-sm">
              Why Choose GearUp?
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              Everything You Need for Your{" "}
              <span className="text-sky-400">Adventure</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              We make the entire rental experience simple, transparent, and
              convenient.
            </p>
          </div>

          {/* Why Cards */}
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {[
              {
                icon: Package,
                title: "Wide Range of Gear",
                description:
                  "Find equipment for cycling, camping, fitness, water sports, and more.",
              },
              {
                icon: CircleDollarSign,
                title: "Affordable Pricing",
                description:
                  "Get access to quality equipment without the cost of ownership.",
              },
              {
                icon: ShieldCheck,
                title: "Trusted Equipment",
                description:
                  "Choose reliable gear so you can focus on enjoying your activity.",
              },
              {
                icon: Zap,
                title: "Easy Rental Process",
                description:
                  "Browse, select, book, and enjoy your gear with a simple process.",
              },
              {
                icon: Users,
                title: "Customer Focused",
                description:
                  "We are focused on creating a smooth experience for every user.",
              },
              {
                icon: Headphones,
                title: "Helpful Support",
                description:
                  "Get assistance whenever you need help with your rental.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-sky-500/15 bg-[#111622]/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:bg-sky-500/5 hover:shadow-[0_0_25px_rgba(2,132,199,0.08)] sm:p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <h3 className="text-base font-semibold text-white sm:text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-400 sm:mt-3 sm:text-sm sm:leading-6">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          5. OUR VALUES
      ====================================================== */}
      <section className="border-b border-sky-500/10">
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 sm:text-sm">
              Our Values
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              What <span className="text-sky-400">GearUp</span> Stands For
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              Our values guide everything we do and help us create a better
              experience for our customers and providers.
            </p>
          </div>

          {/* Values */}
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Trust",
                text: "We believe in creating a safe and dependable rental platform.",
              },
              {
                icon: Heart,
                title: "Passion",
                text: "We are passionate about sports, adventure, and outdoor experiences.",
              },
              {
                icon: Handshake,
                title: "Community",
                text: "We believe strong communities make every adventure better.",
              },
              {
                icon: Leaf,
                title: "Responsibility",
                text: "We encourage sharing and responsible use of equipment.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-sky-500/15 bg-[#111622]/60 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 sm:p-6"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6 text-sky-400 sm:h-7 sm:w-7" />
                  </div>

                  <h3 className="text-base font-semibold sm:text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-400 sm:mt-3 sm:text-sm sm:leading-6">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          6. EXPLORE GEARS CTA
      ====================================================== */}
      <section>
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-[#111622] px-5 py-10 text-center sm:rounded-3xl sm:px-10 sm:py-14">
            {/* Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-72 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl sm:h-56 sm:w-96" />

            <div className="relative">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 sm:h-14 sm:w-14">
                <Sparkles className="h-6 w-6 text-sky-400 sm:h-7 sm:w-7" />
              </div>

              <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                Ready for Your Next{" "}
                <span className="text-sky-400">Adventure?</span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                Discover quality sports and outdoor gear available for rent.
                Choose your equipment and get ready to explore more.
              </p>

              <div className="mt-7">
                <Link href="/gears" className="btn-cyber">
                  Explore Gears
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
