import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from '../database/database.providers';
import { DiscountSchema } from './schemas/discountSchema';

export const DISCOUNTS_MODEL = 'DISCOUNTS_MODEL';

export const DiscountsProviders = [
  {
    provide: DISCOUNTS_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('discounts', DiscountSchema),
    inject: [DATABASE_CONNECTION],
  },
];
