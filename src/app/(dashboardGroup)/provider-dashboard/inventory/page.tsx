"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
// import GearFormModal from "./GearFormModal";

import { Gear, GearResponse } from "@/type/type-gear";
import {
  createGear,
  deleteGear,
  getProviderGears,
  updateGear,
} from "../../_actions/get-provider-gear";
import GearFormModal from "./gearFormModal";

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

  const handleAdd = () => {
    setSelectedGear(null);
    setIsModalOpen(true);
  };

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
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>

          <p className="text-muted-foreground">Manage all your rental gears.</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Gear
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Brand</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-center">Quantity</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : gears.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">
                  No Gear Found
                </td>
              </tr>
            ) : (
              gears.map((gear) => (
                <tr key={gear.id} className="border-t">
                  <td className="px-4 py-3">
                    <img
                      src={gear.gearItemImage}
                      alt={gear.title}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium">{gear.title}</td>

                  <td className="px-4 py-3">{gear.category}</td>

                  <td className="px-4 py-3">{gear.brand}</td>

                  <td className="px-4 py-3 text-center">৳ {gear.price}</td>

                  <td className="px-4 py-3 text-center">{gear.quantity}</td>

                  <td className="space-x-2 px-4 py-3 text-center">
                    <button
                      onClick={() => handleEdit(gear)}
                      className="rounded border p-2 hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(gear.id)}
                      className="rounded border p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
