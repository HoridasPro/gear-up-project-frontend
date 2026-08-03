import GearGrid from "../_components/gearGrid";
import FilterSidebar from "../_components/filterSideBar";

type Props = {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    price?: number;
  }>;
};

export default async function GearPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 lg:col-span-3">
          <FilterSidebar />
        </aside>

        <main className="col-span-12 lg:col-span-9">
          <GearGrid category={params.category} brand={params.brand} price={params.price} />
        </main>
      </div>
    </div>
  );
}
