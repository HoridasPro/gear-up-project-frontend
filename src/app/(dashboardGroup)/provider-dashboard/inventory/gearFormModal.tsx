"use client";

import { useState } from "react";
import { Gear } from "@/type/type-gear";

interface GearFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Gear) => Promise<void>;
  initialData?: Gear | null;
}

export default function GearFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: GearFormModalProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [description, setDescription] = useState<string>(
    initialData?.description || "",
  );
  const [category, setCategory] = useState<string>(initialData?.category || "");
  const [brand, setBrand] = useState<string>(initialData?.brand || "");
  const [price, setPrice] = useState<number>(initialData?.price ?? 0);
  const [quantity, setQuantity] = useState<number>(initialData?.quantity ?? 1);
  const [gearItemImage, setGearItemImage] = useState<string>(
    initialData?.gearItemImage || "",
  );

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: Gear = {
      id: initialData?.id || "",
      title,
      description,
      category,
      price,
      quantity,
      brand,
      gearItemImage,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      providerId: initialData?.providerId || "",
    };

    setLoading(true);
    await onSubmit(data);
    setLoading(false);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-900 dark:text-white">
        <h2 className="mb-6 text-2xl font-bold">
          {initialData ? "Edit Gear" : "Add New Gear"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border p-2 bg-transparent"
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border p-2 bg-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-medium">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border p-2 bg-transparent"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-lg border p-2 bg-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-medium">Price</label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full rounded-lg border p-2 bg-transparent"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full rounded-lg border p-2 bg-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-medium">Image URL</label>
            <input
              type="url"
              value={gearItemImage}
              onChange={(e) => setGearItemImage(e.target.value)}
              className="w-full rounded-lg border p-2 bg-transparent"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : initialData ? "Update Gear" : "Add Gear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
