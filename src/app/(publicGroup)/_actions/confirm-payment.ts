"use server";

import { cookies } from "next/headers";

export const confirmPayment = async (sessionId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  console.log("URL:", `${process.env.BACKEND_API_URL}/api/payments/confirm`);
  console.log("Token Present?:", !!token);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/confirm`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        sessionId,
      }),
    },
  );

  return res.json();
};
