/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { Gear } from "@/type/type-gear";

type Props = {
  gear: Gear;
};

export default function FeaturedGearCard({ gear }: Props) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const rawImg = gear?.gearItemImage;
  const imageUrl = rawImg
    ? rawImg.startsWith("http")
      ? rawImg
      : `${BACKEND_URL}/${rawImg.replace(/^\//, "")}`
    : "/placeholder.png";

  const gearId = gear?.id || (gear as Record<string, any>)?._id;

  return (
    <div className="group relative rounded-xl border-l-4 border-l-cyan-400 border-y border-r border-slate-800 bg-slate-950/90 p-1 transition-all duration-300 hover:-translate-y-1.5 hover:border-l-cyan-300 hover:border-r-slate-700 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.25)] flex flex-col justify-between w-full max-w-sm sm:max-w-md mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <div className="relative h-48 sm:h-52 w-full rounded-lg bg-slate-900 overflow-hidden border border-slate-800/80">
        <Image
          src={imageUrl}
          alt={gear?.title || "Gear Image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={true}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

        <div className="absolute top-3 right-3 z-10">
          {gear?.quantity && gear.quantity > 0 ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 border border-emerald-500/40 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Stock: {gear.quantity}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 border border-rose-500/40 px-2.5 py-0.5 text-[11px] font-medium text-rose-400 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              Unavailable
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 space-y-4 p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-400">
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-md text-cyan-400">
              {gear?.category || "N/A"}
            </span>
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-md text-slate-300">
              {gear?.brand || "N/A"}
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors duration-200 line-clamp-1">
            {gear?.title || "Untitled Gear"}
          </h2>

          <div className="flex items-baseline gap-1 pt-1 border-t border-slate-800/80">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              ৳{gear?.price ?? 0}
            </span>
            <span className="text-xs font-medium text-slate-500">/ day</span>
          </div>
        </div>

        <Link
          href={`/gears/${gearId}`}
          className="mt-2 group/btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg border border-cyan-500/40 bg-slate-900/50 py-2.5 text-xs sm:text-sm font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500 hover:text-slate-950 active:scale-[0.98]"
        >
          <span>View Details</span>
          <svg
            className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
