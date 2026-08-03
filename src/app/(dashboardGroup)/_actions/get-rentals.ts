// // import { cookies } from "next/headers";

// // export const getRentals = async () => {
// //   const cookieStore = await cookies();
// //   const token = cookieStore.get("accessToken")?.value;

// //   const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
// //     headers: {
// //       Authorization: token ? `Bearer ${token}` : "",
// //     },
// //     // cache: "no-store",
// //   });

// //   if (!res.ok) {
// //     throw new Error("Failed to fetch rentals");
// //   }

// //   return res.json();
// // };
// import { cookies } from "next/headers";

// export const getRentals = async () => {
//   const cookieStore = await cookies();

//   const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch rentals");
//   }

//   return res.json();
// };
import { cookies } from "next/headers";

export const getCustomerDashboard = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
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