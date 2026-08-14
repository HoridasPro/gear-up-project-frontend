"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";

import { Gear, GearResponse } from "@/type/type-gear";
import {
  createGear,
  deleteGear,
  getProviderGears,
  updateGear,
} from "../../_actions/get-provider-gear";
import GearFormModal from "./gearFormModal";
import Image from "next/image";

export default function InventoryPage() {
  const [gears, setGears] = useState<Gear[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGear, setSelectedGear] = useState<Gear | null>(null);

  const fetchGears = async () => {
    try {
      setLoading(true);

      const response: GearResponse = await getProviderGears();

      if (response.success) {
        setGears(response.data);
      } else {
        setGears([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGears();
  }, []);

  const handleEdit = (gear: Gear) => {
    setSelectedGear(gear);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Gear) => {
    if (selectedGear) {
      await updateGear(selectedGear.id, data);
    } else {
      await createGear(data);
    }

    setIsModalOpen(false);
    fetchGears();
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this gear?");

    if (!confirmDelete) return;

    await deleteGear(id);
    fetchGears();
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-2 min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Inventory
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-400">
            Manage all my gears.
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] sm:min-w-full">
            <thead className="border-b border-gray-800/80 bg-gray-900/60 text-xs sm:text-sm uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">SI</th>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">Image</th>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">Title</th>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">Category</th>
                <th className="px-4 py-3.5 sm:px-6 font-semibold">Brand</th>
                <th className="px-4 py-3.5 sm:px-6 text-center font-semibold">
                  Price
                </th>
                <th className="px-4 py-3.5 sm:px-6 text-center font-semibold">
                  Quantity
                </th>
                <th className="px-4 py-3.5 sm:px-6 text-center font-semibold">
                  CreatedAt
                </th>
                <th className="px-4 py-3.5 sm:px-6 text-center font-semibold">
                  UpdatedAt
                </th>
                <th className="px-4 py-3.5 sm:px-6 text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/60 text-xs sm:text-sm">
              {loading ? (
                <tr>
                  <td
                    colSpan={10}
                    className="py-12 text-center text-gray-400 font-medium"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
                      Loading inventory...
                    </div>
                  </td>
                </tr>
              ) : gears.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="py-12 text-center text-gray-400 font-medium"
                  >
                    No Gear Found
                  </td>
                </tr>
              ) : (
                gears.map((gear, index) => (
                  <tr
                    key={gear.id}
                    className="transition-colors hover:bg-gray-800/40"
                  >
                    {/* SI */}
                    <td className="px-4 py-4 sm:px-6 font-medium text-gray-400 whitespace-nowrap">
                      {index + 1}
                    </td>

                    {/* Image */}
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                      <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-gray-800 bg-gray-900/80 shadow-md">
                        <Image
                          src={gear.gearItemImage}
                          alt={gear.title}
                          fill
                          unoptimized
                          className="rounded object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </td>

                    {/* Title */}
                    <td className="px-4 py-4 sm:px-6 font-semibold text-white whitespace-nowrap max-w-[200px] truncate">
                      {gear.title}
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-lg bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-400">
                        {gear.category}
                      </span>
                    </td>

                    {/* Brand */}
                    <td className="px-4 py-4 sm:px-6 text-gray-300 whitespace-nowrap">
                      {gear.brand}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4 sm:px-6 text-center font-bold text-emerald-400 whitespace-nowrap">
                      ৳ {gear.price}
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-4 sm:px-6 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center justify-center min-w-[32px] px-2 py-0.5 rounded-md text-xs font-semibold border ${
                          gear.quantity > 0
                            ? "bg-gray-800/80 border-gray-700 text-gray-200"
                            : "bg-red-500/10 border-red-500/20 text-red-400"
                        }`}
                      >
                        {gear.quantity}
                      </span>
                    </td>

                    {/* CreatedAt */}
                    <td className="px-4 py-4 sm:px-6 text-center text-gray-400 text-xs whitespace-nowrap">
                      {gear.createdAt
                        ? new Date(gear.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* UpdatedAt */}
                    <td className="px-4 py-4 sm:px-6 text-center text-gray-400 text-xs whitespace-nowrap">
                      {gear.createdAt
                        ? new Date(gear.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 sm:px-6 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(gear)}
                          className="rounded-lg border border-gray-800 bg-gray-900/60 p-2 text-gray-300 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 active:scale-95"
                          title="Edit Gear"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(gear.id)}
                          className="rounded-lg border border-gray-800 bg-gray-900/60 p-2 text-red-400 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300 active:scale-95"
                          title="Delete Gear"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <GearFormModal
        key={selectedGear?.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedGear}
      />
    </div>
  );
}
