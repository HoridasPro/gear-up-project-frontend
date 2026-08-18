"use server";

import { cookies } from "next/headers";

export const getReviews = async () => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "User not logged in",
        data: [],
      };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch reviews",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error("Get reviews error:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};
