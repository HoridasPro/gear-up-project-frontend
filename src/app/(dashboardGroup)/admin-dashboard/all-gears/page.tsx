/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gear, GearResponse } from "@/type/type-gear";
import Image from "next/image";
import { getAdminAllGears } from "../../_actions/get-admin-gears";

export default async function ProviderDashboard() {
  let gears: Gear[] = [];
  try {
    const result: GearResponse = await getAdminAllGears();
    gears = result?.data || [];
  } catch (error) {
    console.error("Failed to fetch provider gears:", error);
  }

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          All Gears
        </h1>
        <p className="text-sm text-slate-400">Overview of your inventory</p>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 text-slate-100 shadow-xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th scope="col" className="px-4 py-4 text-center">
                  SI
                </th>
                <th scope="col" className="px-4 py-4">
                  Image
                </th>
                <th scope="col" className="px-4 py-4">
                  Title
                </th>
                <th scope="col" className="px-4 py-4">
                  Category
                </th>
                <th scope="col" className="px-4 py-4 text-center">
                  Price
                </th>
                <th scope="col" className="px-4 py-4 text-center">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-4">
                  Brand
                </th>
                <th scope="col" className="px-4 py-4">
                  CreatedAt
                </th>
                <th scope="col" className="px-4 py-4">
                  UpdatedAt
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
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
                      className="transition-colors duration-150 ease-in-out hover:bg-slate-800/50"
                    >
                      <td className="whitespace-nowrap px-4 py-4 text-center text-xs font-medium text-slate-400">
                        {index + 1}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-slate-700/80 bg-slate-800 ring-2 ring-slate-700/50">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={gear.title || "Gear image"}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <span className="flex h-full items-center justify-center p-1 text-center text-[10px] font-medium text-slate-400">
                              No Img
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-white">
                        {gear.title || "N/A"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-300">
                        <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                          {gear.category || "N/A"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-center font-semibold text-emerald-400">
                        ৳ {gear.price ?? 0}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-center font-medium text-slate-200">
                        {gear.quantity ?? 0}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-300">
                        {gear.brand || "N/A"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-400">
                        {gear.createdAt
                          ? new Date(gear.createdAt).toLocaleDateString("en-GB")
                          : "N/A"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-400">
                        {gear.createdAt
                          ? new Date(gear.updatedAt).toLocaleDateString("en-GB")
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-12 text-center text-slate-400"
                  >
                    No gear items found. Please check your backend connection or
                    authentication.
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
