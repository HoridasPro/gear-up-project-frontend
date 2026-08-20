"use server"
import { cookies } from "next/headers";

export const getAdminOrdersDashboard = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
};
