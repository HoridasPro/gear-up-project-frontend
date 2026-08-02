import Image from "next/image";
import Link from "next/link";
import { Gear } from "@/type/type-gear";

type Props = {
  gear: Gear;
};

export default function GearCard({ gear }: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative h-56 w-full">
        <Image
          src={gear.gearItemImage}
          alt={gear.title}
          fill
          className="rounded-t-xl object-cover"
        />
      </div>

      <div className="space-y-3 p-5">
        <h2 className="text-xl font-semibold">{gear.title}</h2>

        <p className="text-gray-500">
          Category:
          <span className="ml-2 font-medium">
            {gear.category}
          </span>
        </p>
         <p className="text-gray-500">
          Brand:
          <span className="ml-2 font-medium">{gear.brand}</span>
        </p>

        <p className="text-2xl font-bold text-green-600">
          ${gear.price}
          <span className="text-base text-gray-500"> /day</span>
        </p>

        {gear.quantity > 0 ? (
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            Available
          </span>
        ) : (
          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
            Out of Stock
          </span>
        )}

        <Link
          href={`/gear/${gear.id}`}
          className="mt-4 block rounded-lg bg-black py-3 text-center text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
 