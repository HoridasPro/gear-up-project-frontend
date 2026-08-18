// dfgsdgs
export type RentalGear = {
  id: string;
  quantity: number;
  totalPrice: number;
  startDate: string;
  endDate: string;
  rentalDate: string;
  status: string;
  payment?: {
    status: string;
  };
  gearItemId: string;
  gearItem: Gear;
  hasReview: boolean;
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

export type Payments = {
  id: string;
  currentPeriodEnd: string;
  amount: number;
  status: string;
  customerId: string;
  rentalOrderId: string;
  createdAt: string;
  updatedAt: string;
  customer: customerInformation;
  geraItem: gearItems;
  // sessionId: string;
};
type customerInformation = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
};

type gearItems = {
  id: string;
  title: string;
  gearItemImage: string | null;
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

export interface ReviewCustomer {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
}

export interface ReviewGearItem {
  id: string;
  title: string;
  gearItemImage?: string | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  customerId: string;
  gearItemId: string;
  createdAt: string;
  updatedAt: string;
  customer?: ReviewCustomer;
  gearItem?: ReviewGearItem;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data: Review[];
}

// Login
export type ILoginAction = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

// Register
export type RegisterAction = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
  } | null;
};

export type Props = {
  place: number;
  pickedup: number;
  returned: number;
};
export interface ReviewButtonProps {
  rentalOrderId: string;
  gearItemId: string;
}
export type PageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    limit?: string;
  }>;
};
export interface UserTableProps {
  users: CustomerIfo[];
  totalPages: number;
  currentPage: number;
  currentSearch: string;
  limit?: number;
}
export interface GearFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Gear) => Promise<void>;
  initialData?: Gear | null;
}
export type FilterProps = {
  category?: string;
  brand?: string;
  price?: number;
  search?: string;
};
export type SearchProps = {
  categories: string[];
  brands: string[];
  prices: number[];
};
export type SearchParamsProps = {
  searchParams: Promise<{
    search: string;
    category?: string;
    brand?: string;
    price?: number;
  }>;
};
export interface NavItem {
  label: string;
  to: string;
}
