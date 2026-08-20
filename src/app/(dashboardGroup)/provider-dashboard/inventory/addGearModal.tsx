/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { addGearAction } from "@/app/(dashboardGroup)/_actions/addGearAction";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { AddGearModalProps } from "@/type/type-gear";
import Image from "next/image";

export default function AddGearModal({
  isOpen,
  onClose,
  onSuccess,
}: AddGearModalProps) {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const imageFile = formData.get("gearItemImage") as File;

    if (!imageFile || imageFile.size === 0) {
      toast.error("Please select an image file");
      return;
    }

    startTransition(async () => {
      try {
        // ImageBB upload
        const imgbbFormData = new FormData();
        imgbbFormData.append("image", imageFile);

        const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: imgbbFormData,
          },
        );

        const imgbbResult = await imgbbRes.json();

        if (!imgbbResult.success) {
          throw new Error("Failed to upload image to ImageBB");
        }

        const imageUrl = imgbbResult.data.display_url;

        // Backend payload
        const payload = new FormData();

        payload.append("title", formData.get("title") as string);
        payload.append("category", formData.get("category") as string);
        payload.append("description", formData.get("description") as string);
        payload.append("brand", formData.get("brand") as string);
        payload.append("price", formData.get("price") as string);
        payload.append("quantity", formData.get("quantity") as string);
        payload.append("gearItemImage", imageUrl);

        const res = await addGearAction(payload);

        if (!res?.success) {
          throw new Error(res?.message || "Failed to add gear");
        }

        toast.success("Gear added successfully!");

        form.reset();

        onSuccess();
      } catch (error: any) {
        toast.error(error?.message || "Something went wrong!");
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-800/80 bg-[#0b0f19] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="absolute right-4 top-4 rounded-lg border border-gray-800 bg-gray-900/60 p-2 text-gray-400 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-8 pr-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Add New Gear
          </h1>

          <p className="mt-2 text-xs text-gray-400 sm:text-sm">
            Fill in the details below to add a new item to your gear inventory.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
              Title
            </label>

            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Sony Alpha A7 III Camera"
              className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs text-gray-100 outline-none transition-all placeholder:text-gray-500 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 sm:text-sm"
            />
          </div>
          {/* description */}
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
              Description
            </label>

            <input
              type="text"
              name="description"
              required
              placeholder="e.g. Sony Alpha A7 III Camera"
              className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs text-gray-100 outline-none transition-all placeholder:text-gray-500 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 sm:text-sm"
            />
          </div>

          {/* Category + Brand */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                Category
              </label>

              <input
                type="text"
                name="category"
                required
                placeholder="e.g. Cameras"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs text-gray-100 outline-none transition-all placeholder:text-gray-500 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 sm:text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                required
                placeholder="e.g. Sony"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs text-gray-100 outline-none transition-all placeholder:text-gray-500 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 sm:text-sm"
              />
            </div>
          </div>

          {/* Price + Quantity */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                Price (৳)
              </label>

              <input
                type="number"
                name="price"
                required
                min="0"
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs text-gray-100 outline-none transition-all placeholder:text-gray-500 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 sm:text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                required
                min="1"
                placeholder="1"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs text-gray-100 outline-none transition-all placeholder:text-gray-500 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 sm:text-sm"
              />
            </div>
          </div>

          {/* Image */}

          <div className="space-y-3 text-xs font-medium text-gray-300 sm:text-sm">
            <label htmlFor="profilePhoto">Profile Photo</label>

            <input
              id="profilePhoto"
              name="gearItemImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full cursor-pointer rounded-xl border border-gray-800/80 bg-gray-900/60 p-2 text-xs text-gray-400 outline-none transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500/10 file:px-2 file:py-2 file:text-xs file:font-semibold file:text-cyan-400 hover:file:bg-cyan-500/20 sm:text-sm"
            />

            {preview && (
              <div className="mt-3 flex justify-center">
                <Image
                  src={preview}
                  alt="Profile preview"
                  width={32}
                  height={32}
                  className="h-[250px] rounded-xl w-full border-2 object-cover"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full cursor-pointer rounded-xl bg-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:bg-cyan-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Uploading & Adding..." : "Add Gear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
