// "use server";

// import { cookies } from "next/headers";

// export const getAdminUsers = async () => {
//   try {
//     const cookieStore = await cookies();

//     const token = cookieStore.get("accessToken")?.value;

//     if (!token) {
//       return {
//         success: false,
//         message: "Access token not found",
//         data: [],
//       };
//     }

//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
//       method: "GET",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json",
//       },
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       return {
//         success: false,
//         message: result.message || "Failed to fetch users",
//         data: [],
//       };
//     }

//     return result;
//   } catch (error) {
//     console.error("Get Admin Users Error:", error);

//     return {
//       success: false,
//       message: "Something went wrong",
//       data: [],
//     };
//   }
// };
"use server";

import { cookies } from "next/headers";

export const getAdminUsers = async () => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "Access token not found",
        data: [],
      };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();
    console.log("ADMIN USERS RESULT =", JSON.stringify(result, null, 2));

    console.log("Admin users API result:", result);

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch users",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error("Get Admin Users Error:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};
