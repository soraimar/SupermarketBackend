import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from "../database/database.module";
import { ProductsProviders } from "./products.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...ProductsProviders],
})
export class ProductsModule {}
