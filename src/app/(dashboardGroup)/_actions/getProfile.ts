"use server";

import { cookies } from "next/headers";

export const myProfile = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      console.log("No accessToken found");
      return null;
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/me`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.log("Get user failed:", res.status);
      return null;
    }

    const result = await res.json();

    console.log("Backend response:", result);

    // Backend response থেকে শুধু user data return করবে
    return result?.data || null;
  } catch (error) {
    console.error("getMe error:", error);
    return null;
  }
};