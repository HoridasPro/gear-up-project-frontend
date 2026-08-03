export type RentalGear = {
  id: string;
  quantity: number;
  totalPrice: number;
  startDate: string;
  endDate: string;
  rentalDate: string;
  status: string;
  gearItemId: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
};
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
export type RentalResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: RentalGear[];
};