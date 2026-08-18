"use server";
import { cookies } from "next/headers";

export const cancelRentalOrder = async (rentalOrderId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/cancel/${rentalOrderId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to cancel rental order");
  }

  return result;
};
