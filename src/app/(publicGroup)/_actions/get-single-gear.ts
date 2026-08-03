export const getSingleGear = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/gear/${id}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch gear");
  }
  const result = await res.json();

  return result;
};
