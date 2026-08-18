/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { addGearAction } from "@/app/(dashboardGroup)/_actions/addGearAction";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AddGearPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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

        const payload = new FormData();
        payload.append("title", formData.get("title") as string);
        payload.append("description", formData.get("description") as string);
        payload.append("category", formData.get("category") as string);
        payload.append("brand", formData.get("brand") as string);
        payload.append("price", formData.get("price") as string);
        payload.append("quantity", formData.get("quantity") as string);
        payload.append("gearItemImage", imageUrl);

        const res = await addGearAction(payload);

        if (res?.success) {
          toast.success("Gear added successfully!");
          router.push("/provider-dashboard/my-gears");
        }
      } catch (error: any) {
        toast.error(error?.message || "Something went wrong!");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl transition-all">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Add New Gear
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Fill in the details below to add a new item to your gear inventory.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Sony Alpha A7 III Camera"
              className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              required
              placeholder="Provide a detailed description of the gear..."
              className="w-full resize-none rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Category
              </label>
              <input
                type="text"
                name="category"
                required
                placeholder="e.g. Cameras"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                required
                placeholder="e.g. Sony"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Price (৳)
              </label>
              <input
                type="number"
                name="price"
                required
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                required
                placeholder="1"
                className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
              Upload Image
            </label>
            <input
              type="file"
              name="gearItemImage"
              accept="image/*"
              required
              className="w-full cursor-pointer rounded-xl border border-gray-800/80 bg-gray-900/60 p-2.5 text-xs sm:text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-cyan-400 hover:file:bg-cyan-500/20 transition-all outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-cyan-500 py-3.5 text-xl sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-cyan-600 active:scale-[0.98] shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
            >
              {isPending ? "Uploading & Adding..." : "Add Gear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
