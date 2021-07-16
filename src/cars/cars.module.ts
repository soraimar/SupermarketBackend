import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { DatabaseModule } from "../database/database.module";
import { ProductsProviders } from "./cars.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [CarsController],
  providers: [CarsService, ...ProductsProviders],
})
export class CarsModule {}
