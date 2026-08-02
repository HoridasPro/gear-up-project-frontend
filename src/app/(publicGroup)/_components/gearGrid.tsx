// import { GearResponse } from "@/type/type-gear";

// import GearCard from "./gearCard";
// import { getGears } from "../_actions/get-gears";

// export default async function GearGrid() {
//   const result: GearResponse = await getGears({});

//   if (!result.success || result.data.length === 0) {
//     return <div>Gear not found</div>;
//   }

//   return (
//     <section className="container mx-auto px-5 py-10">
//       <h2 className="mb-10 text-center text-4xl font-bold">Available Gear</h2>

//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {result.data.map((gear) => (
//           <GearCard key={gear.id} gear={gear} />
//         ))}
//       </div>
//     </section>
//   );
// }
import { GearResponse } from "@/type/type-gear";
import { getGears } from "../_actions/get-gears";
import GearCard from "./gearCard";

type Props = {
  category?: string;
  brand?: string;
  price?: number;
};

export default async function GearGrid({ category, brand, price }: Props) {
  const result: GearResponse = await getGears({
    category,
    brand,
    price,
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
