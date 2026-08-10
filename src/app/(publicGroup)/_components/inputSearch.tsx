"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
    <form onSubmit={handleSearch} className="mb-6 flex gap-3">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search gears..."
          value={search}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
