"use server";
import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
    };
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });
  const result = await res.json();
  console.log(result);
  return result;
};
// "use server";
// import { cookies } from "next/headers";

// export const getMe = async () => {
//   try {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get("accessToken")?.value;

//     if (!accessToken) {
//       console.log("No accessToken found in cookies");
//       return null;
//     }

//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // অধিকাংশ Node/Express ব্যাকএন্ডে এই দুটি উপায়ের যেকোনো একটি বা দুটিই লাগে:
//         Authorization: `Bearer ${accessToken}`,
//         Cookie: `accessToken=${accessToken}`,
//       },
//       cache: "no-store", // সর্বদা তাজা ডেটা পাওয়ার জন্য
//     });

//     if (!res.ok) {
//       console.error(`Backend returned status: ${res.status}`);
//       return null;
//     }

//     const result = await res.json();
//     console.log("Backend response:", result);

//     // ব্যাকএন্ডের রেসপন্স ফরম্যাট যদি { success: true, data: { user } } হয়:
//     if (result?.success) {
//       return result.data || result.user || result;
//     }

//     return null;
//   } catch (error) {
//     console.error("Fetch error in getMe:", error);
//     return null;
//   }
// };
