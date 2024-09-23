import { Document } from 'mongoose';

export interface ProductsInOrder {
  productId: string;
  quantity: number;
  price: number;
}
export interface OrderDocument extends Document {
  id: string;
  userId: string;
  orderAmount: number;
  orderDate: Date;
  status: string;
  transactionId: string;
  products: ProductsInOrder[];
}
