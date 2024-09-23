import { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { dbConnection } from '../helpers/mongoose.helper';
import { OrderDocument } from '../types/models/order';

const orderSchema = new Schema<OrderDocument>(
  {
    id: { type: String, default: uuid, unique: true },
    orderAmount: { type: Number },
    userId: { type: String, default: '', trim: true },
    orderDate: { type: Date },
    status: { type: String, default: '', trim: true },

    products: [
      {
        productId: { type: String, default: '', trim: true },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Order = dbConnection.model<OrderDocument>('orders', orderSchema, 'orders');
