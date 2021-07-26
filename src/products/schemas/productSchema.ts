import { Schema, Types, Document } from 'mongoose';

export interface Products extends Document {
  descuento: string;
  _id: Types.ObjectId;
  brand: string;
  description: string;
  id: number;
  image: string;
  price: number;
}

export const ProductSchema = new Schema<Products>({
  _id: Types.ObjectId,
  brand: String,
  description: String,
  id: Number,
  image: String,
  price: Number,
});
