import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedGears } from "../../_actions/get-fetured-gears";
import { GearResponse } from "@/type/type-gear";

const FeaturedGear = async () => {
  const result: GearResponse = await getFeaturedGears();

  const gears = result.data || [];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Explore Our Collection
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">Featured Gear</h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Discover our most popular sports and outdoor equipment available
              for rent.
            </p>
          </div>

          <Link
            href="/gear"
            className="hidden items-center gap-2 font-semibold hover:underline md:flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Gear Grid */}
        {gears.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gears.slice(0, 8).map((gear) => (
              <div
                key={gear.id}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={gear.gearItemImage}
                    alt={gear.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           25vw"
                  />

                  {/* Availability */}
                  <div className="absolute left-3 top-3">
                    {gear.quantity > 0 ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Available
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="mb-1 text-sm text-gray-500">
                    {gear.category || "Sports Gear"}
                  </p>

                  <h3 className="line-clamp-1 text-lg font-bold">
                    {gear.title}
                  </h3>

                  {gear.brand && (
                    <p className="mt-1 text-sm text-gray-500">
                      Brand: {gear.brand}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold">
                        ৳{gear.price}
                      </span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>

                    <Link
                      href={`/gear/${gear.id}`}
                      className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border py-12 text-center">
            <p className="text-gray-500">
              No featured gear available right now.
            </p>
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/gear"
            className="inline-flex items-center gap-2 font-semibold hover:underline"
          >
            View All Gear
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGear;
