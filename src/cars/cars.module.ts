import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { DatabaseModule } from '../database/database.module';
import { CarsProviders } from './cars.providers';
import { ProductsService } from '../products/products.service';
import { ProductsProviders } from '../products/products.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CarsController],
  providers: [
    CarsService,
    ProductsService,
    ...CarsProviders,
    ...ProductsProviders,
  ],
})
export class CarsModule {}
