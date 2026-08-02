// "use server";
// import { cookies } from "next/headers";

// export const refreshToken = async () => {
//   const cookieStore = await cookies();
//   const refreshToken = cookieStore.get("refreshToken")?.value;
//   if (!refreshToken) {
//     return {
//       success: false,
//       message: "User not logged in",
//     };
//   }
//   const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
//     headers: {
//       Cookie: `refreshToken=${refreshToken}`,
//     },
//   });
//   const result = await res.json();
//   console.log(result);
//   return result;
// };
