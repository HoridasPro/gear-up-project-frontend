"use client";

import { Clock, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import Link from "next/link";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 selection:bg-blue-500 selection:text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/15 blur-[128px]" />
        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-[128px]" />
      </div>

      {/* HERO SECTION   */}
      <section className="relative z-10 border-b border-gray-800/60 bg-gradient-to-b from-gray-900 to-gray-950 px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 backdrop-blur-md sm:text-sm">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span>Get In Touch</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Contact{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              GearUp
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400 sm:mt-6 sm:text-base md:max-w-2xl md:text-lg">
            Have a question about our gears, rentals, or services? We&apos;re
            here to help. Send us a message and our team will get back to you as
            soon as possible.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT SECTION  */}
      <section className="relative z-10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-600/10 blur-2xl" />

              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Let&apos;s Talk
              </h2>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                Whether you need help choosing the right gear or have a question
                about your rental, feel free to reach out to us.
              </p>

              <div className="mt-8 space-y-6">
                <div className="group flex items-start gap-4 rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-gray-800 hover:bg-gray-800/40">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 ring-1 ring-blue-500/20 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Email
                    </p>
                    <a
                      href="mailto:support@gearup.com"
                      className="mt-0.5 block break-all text-sm font-medium text-white transition-colors hover:text-blue-400 sm:text-base"
                    >
                      support@gearup.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4 rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-gray-800 hover:bg-gray-800/40">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 ring-1 ring-blue-500/20 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-500">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Phone
                    </p>
                    <a
                      href="tel:+8801234567890"
                      className="mt-0.5 block text-sm font-medium text-white transition-colors hover:text-blue-400 sm:text-base"
                    >
                      +880 1234-567890
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4 rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-gray-800 hover:bg-gray-800/40">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 ring-1 ring-blue-500/20 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Address
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-white sm:text-base">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-gray-800 hover:bg-gray-800/40">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 ring-1 ring-blue-500/20 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-500">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Working Hours
                    </p>
                    <p className="mt-0.5 text-sm font-medium leading-snug text-white sm:text-base">
                      Sat - Thu <br />
                      <span className="text-gray-400 font-normal">
                        9:00 AM - 6:00 PM
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM   */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="rounded-3xl border border-gray-800 bg-gray-900/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>

              <form
                className="mt-8 space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-gray-800 bg-gray-950/80 px-4 py-3.5 text-sm text-white placeholder-gray-500 transition duration-200 focus:border-blue-500 focus:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-gray-800 bg-gray-950/80 px-4 py-3.5 text-sm text-white placeholder-gray-500 transition duration-200 focus:border-blue-500 focus:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-gray-800 bg-gray-950/80 px-4 py-3.5 text-sm text-white placeholder-gray-500 transition duration-200 focus:border-blue-500 focus:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full resize-none rounded-xl border border-gray-800 bg-gray-950/80 px-4 py-3.5 text-sm text-white placeholder-gray-500 transition duration-200 focus:border-blue-500 focus:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <button type="submit" className="btn-cyber">
                    <span>Send Message</span>
                    <Send className="h-4 w-7 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/60 px-6 py-12 text-center shadow-2xl backdrop-blur-xl sm:px-12 sm:py-16">
          <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

          <h2 className="relative z-10 text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Gear Up?
          </h2>

          <p className="relative z-10 mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
            Explore our collection of quality sports and outdoor equipment and
            find the perfect gear for your next adventure.
          </p>

          <Link href="/gears" className="btn-cyber mt-4">
            Explore Gears
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
