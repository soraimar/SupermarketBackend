import * as mongoose from 'mongoose';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
mongoose.set('debug', true);
export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://brandDiscountsUser:brandDiscountsPassword@localhost:27017/desafio_walmart?authSource=admin',
      ),
  },
];
