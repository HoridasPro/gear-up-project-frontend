/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  return (
    <div>
      <h1 className="text-2xl font-bold">Provider Dashboard</h1>

      <p className="mt-2 text-muted-foreground">Overview of your inventory</p>

      <div className="mt-6 overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="p-3">SI</th>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Quantity</th>
              <th className="p-3">Brand</th>
              <th className="p-3">CreatedAt</th>
              <th className="p-3">UpdatedAt</th>
            </tr>
          </thead>

          <tbody>
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
                  <tr key={itemKey} className="border-t hover:bg-gray-50">
                    {/* SI */}
                    <td className="p-3">{index + 1}</td>

                    {/* Image */}
                    <td className="p-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded border bg-gray-100">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={gear.title || "Gear image"}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center p-1 text-center text-[10px] text-gray-400">
                            No Img
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Title */}
                    <td className="p-3 font-medium">{gear.title || "N/A"}</td>

                    {/* Category */}
                    <td className="p-3">{gear.category || "N/A"}</td>

                    {/* Price */}
                    <td className="p-3 text-center">৳ {gear.price ?? 0}</td>

                    {/* Quantity */}
                    <td className="p-3 text-center">{gear.quantity ?? 0}</td>

                    {/* Brand */}
                    <td className="p-3">{gear.brand || "N/A"}</td>

                    {/* Created At */}
                    <td className="p-3">
                      {gear.createdAt
                        ? new Date(gear.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-3">
                      {gear.createdAt
                        ? new Date(gear.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  No gear items found. Please check your backend connection or
                  authentication.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
