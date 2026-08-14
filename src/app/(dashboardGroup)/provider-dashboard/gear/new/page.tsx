import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function AddGearPage() {
  async function addGearAction(formData: FormData) {
    "use server";

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const body = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      brand: formData.get("brand"),
      gearItemImage: formData.get("gearItemImage"),
    };

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/gear`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to add gear");
    }

    revalidatePath("/provider-dashboard/my-gears");
    redirect("/provider-dashboard/my-gears");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl transition-all">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Add New Gear
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Fill in the details below to add a new item to your gear inventory.
          </p>
        </div>

        {/* Form */}
        <form action={addGearAction} className="space-y-5 sm:space-y-6">
          {/* Title */}
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

          {/* Description */}
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

          {/* Category & Brand Grid */}
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

          {/* Price & Quantity Grid */}
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

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              name="gearItemImage"
              required
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-500 py-3.5 text-xl sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-cyan-600 active:scale-[0.98] shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              Add Gear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
