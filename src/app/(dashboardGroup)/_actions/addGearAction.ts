"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addGearAction(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("You are not authenticated");
  }

  const body = {
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    category: String(formData.get("category") || ""),
    price: Number(formData.get("price")),
    quantity: Number(formData.get("quantity")),
    brand: String(formData.get("brand") || ""),
    gearItemImage: String(formData.get("gearItemImage") || ""),
  };

  const addGearValidationSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(2, "Description is required").max(1000),
    category: z.string().min(2, "Category is required").max(50),
    price: z.number().positive("Price must be greater than 0"),
    quantity: z.number().int().positive("Quantity must be greater than 0"),
    brand: z.string().min(2, "Brand is required").max(50),
    gearItemImage: z.string().url("Please provide a valid image URL"),
  });

  const validationResult = addGearValidationSchema.safeParse(body);

  if (!validationResult.success) {
    throw new Error(
      validationResult.error.issues[0]?.message || "Invalid data",
    );
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validationResult.data),
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to add gear");
  }

  revalidatePath("/provider-dashboard/my-gears");

  return { success: true, message: "Gear added successfully!" };
}
