export type User = {
  user_id: number;
  first_name: string;
  last_name: string;
  login: string;
  password: string;
  location: string;
  image: string;
};

export type Product = {
  name: string;
  description: string;
  price: number;
};

export type Booking = {
  date: Date;
  user_id: number;
};
