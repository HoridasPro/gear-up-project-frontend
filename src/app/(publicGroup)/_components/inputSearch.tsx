"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";

export default function InputSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(currentSearch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      router.push(`/gears?${params.toString()}`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.push(`/gears?${params.toString()}`);
  };

  const handleClear = () => {
    setSearch("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`/gears?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mb-6 flex flex-col sm:flex-row items-center gap-3 w-full rounded-2xl border border-gray-800 bg-[#0a0d14]/50 p-6 backdrop-blur-sm shadow-xl"
    >
      <div className="relative w-full group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors pointer-events-none">
          <Search className="h-5 w-5" />
        </div>

        <input
          type="text"
          placeholder="Search gears..."
          value={search}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-800 bg-[#0a0d14] py-3.5 pl-11 pr-11 text-gray-100 placeholder-gray-500 shadow-inner outline-none transition-all duration-300 focus:border-cyan-500/60 focus:bg-gray-900/80 focus:ring-4 focus:ring-cyan-500/10 text-sm sm:text-base"
        />

        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-cyan-400"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <button type="submit" className="btn-cyber whitespace-nowrap">
        <Search className="h-4 w-4 sm:hidden group-hover/btn:rotate-12 transition-transform" />
        <span>Search</span>
      </button>
    </form>
  );
}
