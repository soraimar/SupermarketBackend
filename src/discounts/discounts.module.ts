import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DatabaseModule } from '../database/database.module';
import { DiscountsProviders } from './discounts.provider';

@Module({
  imports: [DatabaseModule],
  providers: [DiscountsService, ...DiscountsProviders],
})
export class DiscountsModule {}
