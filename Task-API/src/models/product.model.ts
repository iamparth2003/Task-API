import { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { dbConnection } from '../helpers/mongoose.helper';
import { ProductDocument } from '../types/models/product';

const productSchema = new Schema<ProductDocument>(
  {
    id: { type: String, default: uuid, unique: true },
    isVeg: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isMustTry: { type: Boolean, default: false },
    price: { type: Number },
    quantityValue: { type: Number },
    quantityUnit: { type: String, default: '', trim: true },
    name: { type: String, default: '', trim: true },
    description: { type: String, default: '', trim: true },
    category: { type: String, default: '', trim: true },
    imagePath: { type: String, default: '', trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = dbConnection.model<ProductDocument>('products', productSchema, 'products');
