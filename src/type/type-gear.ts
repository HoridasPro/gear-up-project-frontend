export type Gear = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  brand: string;
  gearItemImage: string;
  createdAt: string;
  updatedAt: string;
  providerId: string;
};

export type GearResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Gear[];
};
