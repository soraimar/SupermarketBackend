import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { DatabaseModule } from '../database/database.module';
import { CarsProviders } from './cars.providers';
import { ProductsService } from '../products/products.service';
import { ProductsProviders } from '../products/products.providers';
import { DiscountsService } from '../discounts/discounts.service';
import { DiscountsProviders } from '../discounts/discounts.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CarsController],
  providers: [
    CarsService,
    ProductsService,
    DiscountsService,
    ...CarsProviders,
    ...ProductsProviders,
    ...DiscountsProviders,
  ],
})
export class CarsModule {}
