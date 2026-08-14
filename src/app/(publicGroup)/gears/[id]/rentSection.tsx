"use client";

import { Gear } from "@/type/type-gear";
import Link from "next/link";

type Props = {
  gear: Gear;
};

export const RentSection = ({ gear }: Props) => {
  return (
    <Link href={`/checkout/${gear.id}`}>
      <button className="w-full text-cyan-300 transition-all duration-300 hover:border-cyan-600 hover:bg-cyan-500 overflow-hidden rounded-xl border border-cyan-500/40 bg-[#08121e] px-6 py-3 text-xl font-mono font-semibold cursor-pointer">
        Rent Now
      </button>
    </Link>
  );
};
