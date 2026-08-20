// import { cookies } from "next/headers";

// export const getAdminOrdersDashboard = async () => {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("accessToken")?.value;

//   const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     console.log("ADMIN RENTALS STATUS:", res.status);
//     console.log("ADMIN RENTALS RESPONSE:", errorText);
//     throw new Error("Failed to fetch dashboard");
//   }

//   return res.json();
// };
"use server";
import { cookies } from "next/headers";

export const getAdminOrdersDashboard = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    console.log("TOKEN EXISTS:", !!token);
    console.log("BACKEND URL:", process.env.BACKEND_API_URL);

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/rentals`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    console.log("ADMIN RENTALS STATUS:", res.status);

    if (!res.ok) {
      const errorText = await res.text();

      console.log("ADMIN RENTALS RESPONSE:", errorText);

      throw new Error(`Admin rentals API failed: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
    throw error;
  }
};
