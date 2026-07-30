"use server";
import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    throw new Error("User not login");
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
