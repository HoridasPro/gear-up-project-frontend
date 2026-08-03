"use client";

import { Gear } from "@/type/type-gear";
import Link from "next/link";

type Props = {
  gear: Gear;
};

export const RentSection = ({ gear }: Props) => {
  return (
    <Link href={`/checkout/${gear.id}`}>
      <button className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
        Rent Now
      </button>
    </Link>
  );
};
