import { cookies } from "next/headers";

export const paymentsHistory = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments`,
    {
      method: "GET",
      headers: {
        Authorization: token || "",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }

  return res.json();
};