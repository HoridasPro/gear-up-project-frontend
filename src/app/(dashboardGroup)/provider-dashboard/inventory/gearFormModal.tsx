"use client";

import { useState } from "react";
import { Gear } from "@/type/type-gear";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-all">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-800/80 bg-[#0b0f19]/95 p-6 sm:p-8 shadow-2xl text-gray-100 backdrop-blur-xl">
        {/* Close Button Header */}
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            {initialData ? "Edit Gear" : "Add New Gear"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-800 bg-gray-900/60 p-1.5 text-gray-400 hover:text-white hover:border-gray-700 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sony Alpha A7 III Camera"
              className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the gear..."
              className="w-full resize-none rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
              required
            />
          </div>

          {/* Category & Brand Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Cameras"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Brand
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Sony"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
                required
              />
            </div>
          </div>

          {/* Price & Quantity Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Price (৳)
              </label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="1"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
                required
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              value={gearItemImage}
              onChange={(e) => setGearItemImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
              required
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-800/80">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-800 bg-gray-900/60 px-5 py-2.5 text-xs sm:text-sm font-semibold text-gray-300 hover:bg-gray-800 hover:text-white transition-all active:scale-95"
            >
              Cancel
            </button>

            <button type="submit" disabled={loading} className="btn-cyber">
              {loading ? "Saving..." : initialData ? "Update Gear" : "Add Gear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
