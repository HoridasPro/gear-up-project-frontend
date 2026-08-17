// src/app/(dashboardGroup)/_actions/payments-status.ts
import { cookies } from "next/headers";

export async function paymentsStatus() {
  try {
    const baseUrl = process.env.BACKEND_API_URL;

    // কুকি হেডার নেওয়া
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value; // আপনার কুকির নাম accessToken না হলে সেটি দিন

    const res = await fetch(`${baseUrl}/api/payments`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Cookie: cookieStore.toString(), 
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`paymentsStatus failed with status: ${res.status}`);
      return { success: false, data: [] };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching payment status:", error);
    return { success: false, data: [] };
  }
}
