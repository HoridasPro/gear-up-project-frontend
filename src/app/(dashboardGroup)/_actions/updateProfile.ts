"use server";

import { cookies } from "next/headers";

export const updateProfile = async (payload: {
  name: string;
  address: string;
  profilePhoto?: string;
}) => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in",
      };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Profile update failed",
      };
    }

    return data;
  } catch (error) {
    console.error("Update profile server action error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
