"use server";

import { cookies } from "next/headers";

export const createPaymentAction = async (rentalOrderId: string) => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in. Please login first.",
      };
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          rentalOrderId,
        }),
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || "Failed to create payment session",
      };
    }

    return data;
  } catch (error) {
    console.error("Create payment action error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create payment session",
    };
  }
};
