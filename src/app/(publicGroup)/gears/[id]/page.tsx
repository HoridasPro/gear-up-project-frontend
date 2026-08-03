import { getSingleGear } from "../../_actions/get-single-gear";
import { GearDetailsPage } from "./gearDetails";
 

export default async function SinglePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getSingleGear(id);

  return (
    <div className="container mx-auto px-5 py-10">
      <GearDetailsPage gear={result.data} />
    </div>
  );
}