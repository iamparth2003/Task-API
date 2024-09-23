import { Document } from 'mongoose';

export interface ProductsInCart {
  productId: string;
  quantity: number;
  price: number;
}
export interface UserDocument extends Document {
  id: string;
  role: 'ADMIN' | 'USER';
  mobileNumber: number;
  salt: string;
  password: string;
  products: ProductsInCart[];
}
