import { Schema, Types, Document } from 'mongoose';
import { ProductSchema, Products } from '../../products/schemas/productSchema';

export interface Cars extends Document {
  id: Types.ObjectId;
  user_id: number;
  products: [Products];
}

export const CarsSchema = new Schema<Cars>({
  id: Types.ObjectId,
  user_id: Number,
  products: [ProductSchema],
});
