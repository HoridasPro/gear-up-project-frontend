"use server";

import { cookies } from "next/headers";

export const myProfile = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();

    return result?.data || null;
  } catch (error) {
    console.error("getMe error:", error);
    return null;
  }
};
