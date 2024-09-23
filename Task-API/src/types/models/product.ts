import { Document } from 'mongoose';

export interface ProductDocument extends Document {
  id: string;
  isVeg: boolean;
  name: string;
  description: string;
  category: string;
  price: number;
  imagePath: string;
  isMustTry: boolean;
  quantityValue: number;
  quantityUnit: string;
  isDeleted: boolean;
}
