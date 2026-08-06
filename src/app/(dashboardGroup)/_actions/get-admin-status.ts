"use server";

import { cookies } from "next/headers";

export const getAdminUsersSearch = async (
  search: string = "",
  page: number = 1,
  limit: number = 10,
) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const authHeader = token
      ? token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`
      : "";

    const apiUrl = `${process.env.BACKEND_API_URL}/api/admin/users?search=${encodeURIComponent(
      search,
    )}&page=${page}&limit=${limit}`;
    console.log("apiURl", apiUrl);

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();
    console.log("API Response:", result);

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to fetch users",
        users: [],
        totalPages: 1,
      };
    }

    return {
      success: true,
      users: result?.data || result?.users || [],
      totalPages: result?.pagination?.totalPages || result?.totalPages || 1,
    };
  } catch (error) {
    console.error("Get Admin Users Error:", error);
    return {
      success: false,
      message: "Something went wrong",
      users: [],
      totalPages: 1,
    };
  }
};

// 2. Update Status Action (Suspend / Activate)
export const updateAdminStatus = async (userId: string, newStatus: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Access token not found" };
    }

    const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to update status",
      };
    }

    // Revalidate table cache to show updated state
    // revalidatePath("/admin-dashboard/user-management");

    return {
      success: true,
      message: "Status updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Update Status Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};
