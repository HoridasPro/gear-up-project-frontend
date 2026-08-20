/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import { Gear, GearResponse } from "@/type/type-gear";
import { getProviderGears } from "../../_actions/get-provider-gear";
import Image from "next/image";

export default async function ProviderDashboard() {
  let gears: Gear[] = [];

  try {
    const result: GearResponse = await getProviderGears();
    gears = result?.data || [];
  } catch (error) {
    console.error("Failed to fetch provider gears:", error);
  }

  const BACKEND_URL = process.env.BACKEND_API_URL;

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-2 min-h-screen text-gray-100">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          My Gears
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Overview of my inventory
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px] sm:min-w-full">
            <thead className="border-b border-gray-800/80 bg-gray-900/60 text-xs sm:text-sm uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">SI</th>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">Image</th>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">Title</th>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">Category</th>
                <th className="px-4 py-3.5 sm:px-6 text-center font-semibold">
                  Price
                </th>
                <th className="px-4 py-3.5 sm:px-6 text-center font-semibold">
                  Quantity
                </th>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">Brand</th>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">CreatedAt</th>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">UpdatedAt</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/60 text-xs sm:text-sm">
              {gears.length > 0 ? (
                gears.map((gear, index) => {
                  const rawImg = gear.gearItemImage;

                  const imageUrl = rawImg
                    ? rawImg.startsWith("http")
                      ? rawImg
                      : `${BACKEND_URL}/${rawImg.replace(/^\//, "")}`
                    : null;

                  const itemKey = gear.id || (gear as Record<string, any>)._id;

                  return (
                    <tr
                      key={itemKey}
                      className="transition-colors hover:bg-gray-800/40"
                    >
                      <td className="px-4 py-4 sm:px-6 font-medium text-gray-400 whitespace-nowrap">
                        {index + 1}
                      </td>

                      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                        <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-gray-800 bg-gray-900/80 shadow-md">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={gear.title || "Gear image"}
                              fill
                              unoptimized
                              className="object-cover transition-transform duration-300 hover:scale-110"
                            />
                          ) : (
                            <span className="flex h-full items-center justify-center p-1 text-center text-[10px] text-gray-500 font-medium">
                              No Img
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4 sm:px-6 font-semibold text-white whitespace-nowrap max-w-[200px] truncate">
                        {gear.title || "N/A"}
                      </td>

                      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-lg bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-400">
                          {gear.category || "N/A"}
                        </span>
                      </td>

                      <td className="px-4 py-4 sm:px-6 text-center font-bold text-emerald-400 whitespace-nowrap">
                        ৳ {gear.price ?? 0}
                      </td>

                      <td className="px-4 py-4 sm:px-6 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center justify-center min-w-[32px] px-2 py-0.5 rounded-md text-xs font-semibold border ${
                            (gear.quantity ?? 0) > 0
                              ? "bg-gray-800/80 border-gray-700 text-gray-200"
                              : "bg-red-500/10 border-red-500/20 text-red-400"
                          }`}
                        >
                          {gear.quantity ?? 0}
                        </span>
                      </td>

                      <td className="px-4 py-4 sm:px-6 text-gray-300 whitespace-nowrap">
                        {gear.brand || "N/A"}
                      </td>

                      <td className="px-4 py-4 sm:px-6 text-gray-400 text-xs whitespace-nowrap">
                        {gear.createdAt
                          ? new Date(gear.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="px-4 py-4 sm:px-6 text-gray-400 text-xs whitespace-nowrap">
                        {gear.createdAt
                          ? new Date(gear.updatedAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="p-8 sm:p-12 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-sm sm:text-base font-medium text-gray-300">
                        No gear items found.
                      </p>
                      <p className="text-xs text-gray-500">
                        Please check your backend connection or authentication.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
