import { Connection } from 'mongoose';
import { CarsSchema } from './schemas/carsSchema';
import { DATABASE_CONNECTION } from '../database/database.providers';

export const CARS_MODEL = 'CARS_MODEL';

export const ProductsProviders = [
  {
    provide: CARS_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('cars', CarsSchema),
    inject: [DATABASE_CONNECTION],
  },
];
