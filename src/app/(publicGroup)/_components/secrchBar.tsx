// "use client";

// import { useRouter, useSearchParams } from "next/navigation";

// type Props = {
//   categories: string[];
//   brands: string[];
//   prices: number[];
// };

// export default function SearchBar({ categories, brands, prices }: Props) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const handleFilter = (key: string, value: string) => {
//     const params = new URLSearchParams(searchParams);

//     // একবারে শুধু একটি filter active থাকবে
//     if (key === "category") {
//       params.delete("brand");
//     }

//     if (key === "brand") {
//       params.delete("category");
//     }
//     if (key === "prices") {
//       params.delete("category");
//     }

//     if (value) {
//       params.set(key, value);
//     } else {
//       params.delete(key);
//     }

//     router.push(`/gears?${params.toString()}`);
//   };

//   return (
//     <div className="space-y-4">
//       {/* Category */}
//       <div>
//         <label className="mb-2 block font-medium">Category</label>

//         <select
//           onChange={(e) => handleFilter("category", e.target.value)}
//           value={searchParams.get("category") || ""}
//           className="w-full rounded-lg border p-2"
//         >
//           <option value="">All Category</option>

//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Brand */}
//       <div>
//         <label className="mb-2 block font-medium">Brand</label>

//         <select
//           onChange={(e) => handleFilter("brand", e.target.value)}
//           value={searchParams.get("brand") || ""}
//           className="w-full rounded-lg border p-2"
//         >
//           <option value="">All Brand</option>

//           {brands.map((brand) => (
//             <option key={brand} value={brand}>
//               {brand}
//             </option>
//           ))}
//         </select>
//       </div>
//       {/* prices */}
//       <div>
//         <label className="mb-2 block font-medium">Price</label>

//         <select
//           onChange={(e) => handleFilter("price", e.target.value)}
//           value={searchParams.get("price") || ""}
//           className="w-full rounded-lg border p-2"
//         >
//           <option value="">All price</option>

//           {prices.map((price) => (
//             <option key={price} value={price}>
//               {price}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }
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

  const handleFilter = (
  key: string,
  value: string | number
) => {
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
    <div className="space-y-4">
      {/* Category */}
      <div>
        <label className="mb-2 block font-medium">Category</label>

        <select
          onChange={(e) => handleFilter("category", e.target.value)}
          value={searchParams.get("category") || ""}
          className="w-full rounded-lg border p-2"
        >
          <option value="">All Category</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="mb-2 block font-medium">Brand</label>

        <select
          onChange={(e) => handleFilter("brand", e.target.value)}
          value={searchParams.get("brand") || ""}
          className="w-full rounded-lg border p-2"
        >
          <option value="">All Brand</option>

          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="mb-2 block font-medium">Price</label>

        <select
          onChange={(e) => handleFilter("price", e.target.value)}
          value={searchParams.get("price") || ""}
          className="w-full rounded-lg border p-2"
        >
          <option value="">All Price</option>

          {prices.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
