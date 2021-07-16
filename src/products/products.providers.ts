import { Connection } from 'mongoose';
import { products } from './schemas/products.schema';
import { DATABASE_CONNECTION } from '../database/database.providers';

export const PRODUCTS_MODEL = 'PRODUCTS_MODEL';

export const ProductsProviders = [
  {
    provide: PRODUCTS_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('products', products),
    inject: [DATABASE_CONNECTION],
  },
];
