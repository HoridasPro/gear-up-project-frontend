export const getGears = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`);
  const result =await res.json();
  return result;
};
