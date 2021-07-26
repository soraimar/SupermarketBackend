import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { ProductsModule } from './products/products.module';
import { DiscountsModule } from './discounts/discounts.module';

@Module({
  imports: [CarsModule, ProductsModule, DiscountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
