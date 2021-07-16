import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CarsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
