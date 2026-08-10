export const getGears = async ({
  category,
  brand,
  price,
  search,
}: {
  category?: string;
  brand?: string;
  price?: number;
  search?: string;
}) => {
  const params = new URLSearchParams();

  if (category) params.set("category", category);
  if (brand) params.set("brand", brand);
  if (search) params.set("search", search);
  if (price !== undefined) {
    params.set("price", price.toString());
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/gear?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch gears");
  }

  return res.json();
};
