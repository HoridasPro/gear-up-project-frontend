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
    <div className="mx-auto mt-10 max-w-2xl rounded-lg border bg-white p-6 shadow">
      <h1 className="mb-6 text-3xl font-bold">Add New Gear</h1>

      <form action={addGearAction} className="space-y-5">
        <div>
          <label className="mb-2 block font-medium">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>
          <textarea
            name="description"
            rows={4}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Category</label>
          <input
            type="text"
            name="category"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Brand</label>
          <input
            type="text"
            name="brand"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block font-medium">Price</label>
            <input
              type="number"
              name="price"
              required
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              required
              className="w-full rounded border p-2"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium">Image URL</label>
          <input
            type="url"
            name="gearItemImage"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Add Gear
        </button>
      </form>
    </div>
  );
}
