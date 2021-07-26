import { Schema, Types, Document } from 'mongoose';
import { Products, ProductSchema } from '../../products/schemas/productSchema';
import { DiscountSchema } from '../../discounts/schemas/discountSchema';

export interface Cars extends Document {
  id: Types.ObjectId;
  products: Products[];
  biggerDiscount: any;
  betterDiscount: any;
}

export const CarsSchema = new Schema<Cars>({
  id: Types.ObjectId,
  products: [ProductSchema],
  discount: [DiscountSchema],
});
