"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  categories: string[];
  brands: string[];
  prices: number[];
};

export default function SearchBar({ categories, brands, prices }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);

    if (key === "category") {
      params.delete("brand");
      params.delete("price");
    }

    if (key === "brand") {
      params.delete("category");
      params.delete("price");
    }

    if (key === "price") {
      params.delete("category");
      params.delete("brand");
    }

    if (value !== "" && value !== undefined) {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }

    router.push(`/gears?${params.toString()}`);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl shadow-xl">
      <div className="flex flex-col items-center justify-center gap-1 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 tracking-wide flex items-center gap-2">
          <span>Filtering</span>
        </h1>
        <p className="text-xs text-gray-400">Refine your search results</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Category */}
        <div className="relative">
          <label className="mb-2 block font-semibold text-gray-300 text-sm">
            Category
          </label>
          <div className="relative">
            <select
              onChange={(e) => handleFilter("category", e.target.value)}
              value={searchParams.get("category") || ""}
              className="w-full rounded-xl border border-gray-700 bg-gray-900 text-gray-100 p-3.5 pl-5 pr-10 appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150 ease-in-out text-base shadow-inner"
            >
              <option value="">All Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="relative">
          <label className="mb-2 block font-semibold text-gray-300 text-sm">
            Brand
          </label>
          <div className="relative">
            <select
              onChange={(e) => handleFilter("brand", e.target.value)}
              value={searchParams.get("brand") || ""}
              className="w-full rounded-xl border border-gray-700 bg-gray-900 text-gray-100 p-3.5 pl-5 pr-10 appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150 ease-in-out text-base shadow-inner"
            >
              <option value="">All Brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="relative">
          <label className="mb-2 block font-semibold text-gray-300 text-sm">
            Price
          </label>
          <div className="relative">
            <select
              onChange={(e) => handleFilter("price", e.target.value)}
              value={searchParams.get("price") || ""}
              className="w-full rounded-xl border border-gray-700 bg-gray-900 text-gray-100 p-3.5 pl-5 pr-10 appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150 ease-in-out text-base shadow-inner"
            >
              <option value="">All Price</option>
              {prices.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
