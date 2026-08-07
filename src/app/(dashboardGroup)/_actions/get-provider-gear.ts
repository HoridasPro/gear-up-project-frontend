"use server";
import { cookies } from "next/headers";
import { Gear } from "@/type/type-gear";

const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || "";
};

// Get Provider Gears
export async function getProviderGears() {
  try {
    const token = await getAuthToken();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/gear`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    return await res.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch provider gears",
      data: [],
    };
  }
}

// Create Gear
export async function createGear(data: Gear) {
  try {
    const token = await getAuthToken();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/gear`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

 

    return await res.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to create gear",
    };
  }
}

// Update Gear
export async function updateGear(id: string, data: Gear) {
  try {
    const token = await getAuthToken();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/gear/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    

    return await res.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update gear",
    };
  }
}

// Delete Gear
export async function deleteGear(id: string) {
  try {
    const token = await getAuthToken();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/gear/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

   

    return await res.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete gear",
    };
  }
}
