import FilterSidebar from "../_components/filterSideBar";
import GearGrid from "../_components/gearGrid";
import InputSearch from "../_components/inputSearch";

type Props = {
  searchParams: Promise<{
    search: string;
    category?: string;
    brand?: string;
    price?: number;
  }>;
};

export default async function GearPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-10">
      {/* TOP ROW: Filter Sidebar (Left) & Input Search (Right) */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Horizontal Filter */}
        <div className="w-full lg:w-auto rounded-xl border border-sky-500/20 bg-[#111622]/60 p-4 backdrop-blur-md">
          <FilterSidebar />
        </div>

        {/* Right: Search Input */}
        <div className="w-full sm:w-80 md:w-96">
          <InputSearch />
        </div>
      </div>

      {/* SECTION 2: ALL CARDS GRID */}
      <main className="w-full">
        <GearGrid
          search={params.search}
          category={params.category}
          brand={params.brand}
          price={params.price}
        />
      </main>
    </div>
  );
}
