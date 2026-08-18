import { SearchParamsProps } from "@/type/type-gear";
import FilterSidebar from "../_components/filterSideBar";
import GearGrid from "../_components/gearGrid";
import InputSearch from "../_components/inputSearch";

export default async function GearPage({ searchParams }: SearchParamsProps) {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:w-auto rounded-xl border border-sky-500/20 bg-[#111622]/60 p-4 backdrop-blur-md">
          <FilterSidebar />
        </div>

        <div className="w-full sm:w-80 md:w-96">
          <InputSearch />
        </div>
      </div>

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
