import { GearResponse } from "@/type/type-gear";

import FeaturedGearCard from "./featuredGear";
import { getGears } from "../../_actions/get-gears";

export default async function FeaturedGearGrid() {
  const result: GearResponse = await getGears({});

  if (!result.success || result.data.length === 0) {
    return <div>Gear not found</div>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {result.data.slice(0, 8).map((gear) => (
        <FeaturedGearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
}
