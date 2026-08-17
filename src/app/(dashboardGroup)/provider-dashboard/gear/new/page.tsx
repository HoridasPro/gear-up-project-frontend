/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { addGearAction } from "@/app/(dashboardGroup)/_actions/addGearAction";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
// বা আপনার প্রজেক্টের টোস্ট প্যাকেজ (যেমন: react-hot-toast)

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
        // ১. ImageBB-তে ইমেজ আপলোড
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

        // ২. Server Action-এ ডাটা পাঠানো
        const payload = new FormData();
        payload.append("title", formData.get("title") as string);
        payload.append("description", formData.get("description") as string);
        payload.append("category", formData.get("category") as string);
        payload.append("brand", formData.get("brand") as string);
        payload.append("price", formData.get("price") as string);
        payload.append("quantity", formData.get("quantity") as string);
        payload.append("gearItemImage", imageUrl);

        const res = await addGearAction(payload);

        // ৩. সফল হলে সাকসেস টোস্ট মেসেজ দেখানো এবং রিডাইরেক্ট করা
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

// "use client";

// import { addGearAction } from "@/app/(dashboardGroup)/_actions/addGearAction";
// import { useTransition } from "react";
// import { toast } from "sonner";
// // import { addGearAction } from "@/app/actions/gear"; // আপনার Action-এর সঠিক পাথ দিন

// export default function AddGearPage() {
//   const [isPending, startTransition] = useTransition();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const formData = new FormData(form);

//     const imageFile = formData.get("gearItemImage") as File;

//     if (!imageFile || imageFile.size === 0) {
//       toast.error("Please select an image file");
//       return;
//     }

//     startTransition(async () => {
//       try {
//         // ১. সরাসরি ব্রাউজার থেকেই ImageBB-তে আপলোড করা
//         const imgbbFormData = new FormData();
//         imgbbFormData.append("image", imageFile);

//         const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

//         const imgbbRes = await fetch(
//           `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
//           {
//             method: "POST",
//             body: imgbbFormData,
//           },
//         );

//         const imgbbResult = await imgbbRes.json();

//         if (!imgbbResult.success) {
//           throw new Error("Failed to upload image to ImageBB");
//         }

//         // ইমেজের প্রাপ্ত লিঙ্ক
//         const imageUrl = imgbbResult.data.display_url;

//         // ২. ফাইল বাদে শুধু টেক্সট ডাটা + ইমেজের URL পাঠানো
//         const payload = new FormData();
//         payload.append("title", formData.get("title") as string);
//         payload.append("description", formData.get("description") as string);
//         payload.append("category", formData.get("category") as string);
//         payload.append("brand", formData.get("brand") as string);
//         payload.append("price", formData.get("price") as string);
//         payload.append("quantity", formData.get("quantity") as string);
//         payload.append("gearItemImage", imageUrl);

//         await addGearAction(payload);
//       } catch (error: any) {
//         toast.error(error?.message || "Something went wrong!");
//       }
//     });
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl transition-all">
//         <div className="mb-8">
//           <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
//             Add New Gear
//           </h1>
//           <p className="mt-2 text-xs sm:text-sm text-gray-400">
//             Fill in the details below to add a new item to your gear inventory.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
//           <div>
//             <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//               Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               required
//               placeholder="e.g. Sony Alpha A7 III Camera"
//               className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//               Description
//             </label>
//             <textarea
//               name="description"
//               rows={4}
//               required
//               placeholder="Provide a detailed description of the gear..."
//               className="w-full resize-none rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//             />
//           </div>

//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//                 Category
//               </label>
//               <input
//                 type="text"
//                 name="category"
//                 required
//                 placeholder="e.g. Cameras"
//                 className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//                 Brand
//               </label>
//               <input
//                 type="text"
//                 name="brand"
//                 required
//                 placeholder="e.g. Sony"
//                 className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//                 Price (৳)
//               </label>
//               <input
//                 type="number"
//                 name="price"
//                 required
//                 placeholder="0.00"
//                 className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//                 Quantity
//               </label>
//               <input
//                 type="number"
//                 name="quantity"
//                 required
//                 placeholder="1"
//                 className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//               Upload Image
//             </label>
//             <input
//               type="file"
//               name="gearItemImage"
//               accept="image/*"
//               required
//               className="w-full cursor-pointer rounded-xl border border-gray-800/80 bg-gray-900/60 p-2.5 text-xs sm:text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-cyan-400 hover:file:bg-cyan-500/20 transition-all outline-none"
//             />
//           </div>

//           <div className="pt-2">
//             <button
//               type="submit"
//               disabled={isPending}
//               className="w-full rounded-xl bg-cyan-500 py-3.5 text-xl sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-cyan-600 active:scale-[0.98] shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
//             >
//               {isPending ? "Uploading & Adding..." : "Add Gear"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { z } from "zod";

// export default function AddGearPage() {
//   async function addGearAction(formData: FormData) {
//     "use server";

//     const cookieStore = await cookies();
//     const token = cookieStore.get("accessToken")?.value;

//     if (!token) {
//       throw new Error("You are not authenticated");
//     }

//     // ১. Form Data থেকে Image File নেওয়া
//     const imageFile = formData.get("gearItemImage") as File;

//     if (!imageFile || imageFile.size === 0) {
//       throw new Error("Please select an image file");
//     }

//     // ২. ImageBB তে ছবি আপলোড করা
//     const imgbbFormData = new FormData();
//     imgbbFormData.append("image", imageFile);

//     const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

//     const imgbbRes = await fetch(
//       `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
//       {
//         method: "POST",
//         body: imgbbFormData,
//       },
//     );

//     const imgbbResult = await imgbbRes.json();

//     if (!imgbbResult.success) {
//       throw new Error("Failed to upload image to ImageBB");
//     }

//     // ImageBB থেকে Direct Image Link নেওয়া
//     const imageUrl = imgbbResult.data.display_url;

//     // ৩. backend-এর জন্য Data রেডি করা
//     const body = {
//       title: String(formData.get("title") || ""),
//       description: String(formData.get("description") || ""),
//       category: String(formData.get("category") || ""),
//       price: Number(formData.get("price")),
//       quantity: Number(formData.get("quantity")),
//       brand: String(formData.get("brand") || ""),
//       gearItemImage: imageUrl,
//     };

//     const addGearValidationSchema = z.object({
//       title: z
//         .string()
//         .min(1, "Title must be at least 2 characters")
//         .max(100, "Title must not exceed 100 characters"),

//       description: z
//         .string()
//         .min(2, "Description must be at least 2 characters")
//         .max(1000, "Description must not exceed 1000 characters"),

//       category: z
//         .string()
//         .min(2, "Category must be at least 2 characters")
//         .max(50, "Category must not exceed 50 characters"),

//       price: z
//         .number()
//         .positive("Price must be greater than 0")
//         .finite("Price must be a valid number"),

//       quantity: z
//         .number()
//         .int("Quantity must be a whole number")
//         .positive("Quantity must be greater than 0")
//         .finite("Quantity must be a valid number"),

//       brand: z
//         .string()
//         .min(2, "Brand must be at least 2 characters")
//         .max(50, "Brand must not exceed 50 characters"),

//       gearItemImage: z.string().url("Please provide a valid image URL"),
//     });

//     const validationResult = addGearValidationSchema.safeParse(body);

//     if (!validationResult.success) {
//       throw new Error(
//         validationResult.error.issues[0]?.message ||
//           "Please provide valid information",
//       );
//     }

//     // ৪. আপনার মূল ব্যাকএন্ডে ڈیٹا পোস্ট করা
//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/provider/gear`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(validationResult.data),
//       },
//     );

//     const result = await res.json();

//     if (!res.ok || !result.success) {
//       throw new Error(result.message || "Failed to add gear");
//     }

//     revalidatePath("/provider-dashboard/my-gears");
//     redirect("/provider-dashboard/my-gears");
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl transition-all">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
//             Add New Gear
//           </h1>

//           <p className="mt-2 text-xs sm:text-sm text-gray-400">
//             Fill in the details below to add a new item to your gear inventory.
//           </p>
//         </div>

//         {/* Form */}
//         <form action={addGearAction} className="space-y-5 sm:space-y-6">
//           {/* Title */}
//           <div>
//             <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//               Title
//             </label>

//             <input
//               type="text"
//               name="title"
//               required
//               placeholder="e.g. Sony Alpha A7 III Camera"
//               className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//               Description
//             </label>

//             <textarea
//               name="description"
//               rows={4}
//               required
//               placeholder="Provide a detailed description of the gear..."
//               className="w-full resize-none rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//             />
//           </div>

//           {/* Category & Brand Grid */}
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//                 Category
//               </label>

//               <input
//                 type="text"
//                 name="category"
//                 required
//                 placeholder="e.g. Cameras"
//                 className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//                 Brand
//               </label>

//               <input
//                 type="text"
//                 name="brand"
//                 required
//                 placeholder="e.g. Sony"
//                 className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//               />
//             </div>
//           </div>

//           {/* Price & Quantity Grid */}
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//                 Price (৳)
//               </label>

//               <input
//                 type="number"
//                 name="price"
//                 required
//                 placeholder="0.00"
//                 className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//                 Quantity
//               </label>

//               <input
//                 type="number"
//                 name="quantity"
//                 required
//                 placeholder="1"
//                 className="w-full rounded-xl border border-gray-800/80 bg-gray-900/60 p-3 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
//               />
//             </div>
//           </div>

//           {/* File Upload (PC থেকে ছবি সিলেক্টের জন্য) */}
//           <div>
//             <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
//               Upload Image
//             </label>

//             <input
//               type="file"
//               name="gearItemImage"
//               accept="image/*"
//               required
//               className="w-full cursor-pointer rounded-xl border border-gray-800/80 bg-gray-900/60 p-2.5 text-xs sm:text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-cyan-400 hover:file:bg-cyan-500/20 transition-all outline-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="pt-2">
//             <button
//               type="submit"
//               className="w-full rounded-xl bg-cyan-500 py-3.5 text-xl sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-cyan-600 active:scale-[0.98] shadow-lg shadow-emerald-500/20 cursor-pointer"
//             >
//               Add Gear
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
