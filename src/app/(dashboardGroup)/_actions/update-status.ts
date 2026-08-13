"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateOrderStatus = async (id: string, status: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/orders/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    },
  );

  revalidatePath("/provider-dashboard/orders");

  return res.json();
};
