"use server";

import { cookies } from "next/headers";

export const getProviderOrders = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/orders`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.json();
};
