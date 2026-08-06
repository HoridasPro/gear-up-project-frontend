// dfgsdgs
export type RentalGear = {
  id: string;
  quantity: number;
  totalPrice: number;
  startDate: string;
  endDate: string;
  rentalDate: string;
  status: string;
  gearItemId: string;
  gearItem: Gear;
  customerId: string;
  customer: CustomerIfo;
  createdAt: string;
  updatedAt: string;
};
export type RentalResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: RentalGear[];
};

// xfgsdfgsdfgsdfg
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

// sdfgsdfg
export type Payments = {
  id: string;
  currentPeriodEnd: string;
  amount: number;
  status: string;
  customerId: number;
  rentalOrderId: number;
  createdAt: string;
  updatedAt: string;
};
export type PaymentsGear = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Payments[];
};

// fgsdfgs
export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    address: string;
    profilePhoto: string;
    createdAt: string;
    updatedAt: string;
  };
};
export type CustomerIfo = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  address: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
};
export type IUserInfo = {
  success: boolean;
  statusCode: number;
  message: string;
  data: CustomerIfo[];
};
