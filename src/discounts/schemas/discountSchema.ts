import { Schema, Types, Document } from 'mongoose';

export interface Discounts extends Document {
  _id: Types.ObjectId;
  brand: string;
  discount: number;
  threshold: number;
}

export const DiscountSchema = new Schema<Discounts>({
  _id: Types.ObjectId,
  brand: String,
  discount: Number,
  threshold: Number,
});
