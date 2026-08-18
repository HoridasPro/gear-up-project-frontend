"use server";
import { cookies } from "next/headers";
export const updateAdminRole = async (
  id: string,
  role: "ADMIN" | "PROVIDER" | "CUSTOMER",
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const url = `${process.env.BACKEND_API_URL}/api/admin/users/${id}/role`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        role,
      }),
      cache: "no-store",
    });

    const text = await res.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return {
        success: false,
        message: `Backend returned invalid response. Status: ${res.status}`,
      };
    }

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to update role",
      };
    }

    return data;
  } catch (error) {
    console.error("Update Admin Role Error:", error);

    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
