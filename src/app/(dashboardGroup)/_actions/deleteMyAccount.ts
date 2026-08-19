"use server";

import { cookies } from "next/headers";

export const deleteMyAccount = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/deleteAccount/me`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete account",
      };
    }

    cookieStore.delete("accessToken");

    return {
      success: true,
      message: "Account deleted successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
