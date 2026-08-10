/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { Gear } from "@/type/type-gear";

type Props = {
  gear: Gear;
};

export default function GearCard({ gear }: Props) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const rawImg = gear?.gearItemImage;
  const imageUrl = rawImg
    ? rawImg.startsWith("http")
      ? rawImg
      : `${BACKEND_URL}/${rawImg.replace(/^\//, "")}`
    : "/placeholder.png";

  const gearId = gear?.id || (gear as Record<string, any>)?._id;

  return (
    <div className="rounded-xl border bg-white shadow-sm transition hover:shadow-lg overflow-hidden flex flex-col justify-between">
      <div className="relative h-56 w-full bg-gray-100 border-b">
        <Image
          src={imageUrl}
          alt={gear?.title || "Gear Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={true}
          className="rounded-t-xl object-cover"
        />
      </div>

      <div className="space-y-3 p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold line-clamp-1">
            {gear?.title || "Untitled Gear"}
          </h2>

          <p className="text-gray-500 text-sm">
            Category:
            <span className="ml-2 font-medium text-gray-800">
              {gear?.category || "N/A"}
            </span>
          </p>
          <p className="text-gray-500 text-sm">
            Brand:
            <span className="ml-2 font-medium text-gray-800">
              {gear?.brand || "N/A"}
            </span>
          </p>

          <p className="text-2xl font-bold text-green-600">
            ৳ {gear?.price ?? 0}
            <span className="text-base font-normal text-gray-500"> /day</span>
          </p>

          {gear?.quantity && gear.quantity > 0 ? (
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Available ({gear.quantity})
            </span>
          ) : (
            <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
              Out of Stock
            </span>
          )}
        </div>

        <Link
          href={`/gears/${gearId}`}
          className="mt-4 block w-full rounded-lg bg-black py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
