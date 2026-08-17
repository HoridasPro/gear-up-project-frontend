"use server";

import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function checkGearAvailability(
  gearItemId: string,
  startDate: string,
  endDate: string,
  quantity: number,
) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    console.log("Availability request:", {
      gearItemId,
      startDate,
      endDate,
      quantity,
    });

    const response = await fetch(
      `${BACKEND_API_URL}/api/gear/availability/${gearItemId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          startDate,
          endDate,
          quantity,
        }),
        cache: "no-store",
      },
    );

    console.log("Availability status:", response.status);

    const text = await response.text();

    console.log("Backend raw response:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        `Backend returned invalid JSON. Status: ${response.status}`,
      );
    }

    if (!response.ok) {
      throw new Error(data?.message || "Failed to check gear availability");
    }

    return data;
  } catch (error) {
    console.error("Check gear availability error:", error);

    throw new Error(
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
}
