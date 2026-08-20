"use server";

import { cookies } from "next/headers";

export const createRentalAction = async (payload: {
  gearItemId: string;
  quantity: number;
  startDate: string;
  endDate: string;
}) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in. Please login first.",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result?.message || "Failed to create rental order",
    };
  }

  return result;
};