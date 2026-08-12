import { GearResponse } from "@/type/type-gear";
import { getGears } from "../_actions/get-gears";
import GearCard from "./gearCard";

type Props = {
  category?: string;
  brand?: string;
  price?: number;
  search?: string;
};

export default async function GearGrid({
  category,
  brand,
  price,
  search,
}: Props) {
  const result: GearResponse = await getGears({
    category,
    brand,
    price,
    search,
  });

  if (!result.success || result.data.length === 0) {
    return <div>Gear not found</div>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {result.data.map((gear) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
}
