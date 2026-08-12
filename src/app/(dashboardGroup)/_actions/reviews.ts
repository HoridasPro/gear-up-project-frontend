"use server";

import { cookies } from "next/headers";

export const createReview = async (data: {
  rentalOrderId: string;
  gearItemId: string;
  rating: number;
  comment: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      rentalOrderId: data.rentalOrderId,
      gearItemId: data.gearItemId,
      rating: data.rating,
      comment: data.comment,
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to create review",
    };
  }

  return result;
};
