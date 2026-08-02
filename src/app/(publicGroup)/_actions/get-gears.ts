export const getGears = async ({
  category,
  brand,
  price,
}: {
  category?: string;
  brand?: string;
  price?: number;
}) => {
  const params = new URLSearchParams();

  if (category) params.set("category", category);
  if (brand) params.set("brand", brand);
  if (price !== undefined) {
    params.set("price", price.toString());
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/gear?${params.toString()}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch gears");
  }

  return res.json();
};
