import { GearResponse } from "@/type/type-gear";
import { getGears } from "../_actions/get-gears";
import SearchBar from "./secrchBar";

export default async function FilterSidebar() {
  const result: GearResponse = await getGears({});

  const categories = [...new Set(result.data.map((gear) => gear.category))];
  const brands = [...new Set(result.data.map((gear) => gear.brand))];
  const prices = [...new Set(result.data.map((gear) => gear.price))];

  return (
    <div className="rounded-xl border p-5">
      <SearchBar categories={categories} brands={brands} prices={prices} />
    </div>
  );
}
