import { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { UserDocument } from '../types/models/users';
import { dbConnection } from '../helpers/mongoose.helper';

const userSchema = new Schema<UserDocument>(
  {
    id: { type: String, default: uuid, unique: true },
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER', trim: true },
    mobileNumber: { type: Number, trim: true },
    salt: { type: String, default: '', trim: true },
    password: { type: String, default: '', trim: true },
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

export const User = dbConnection.model<UserDocument>('users', userSchema, 'users');
