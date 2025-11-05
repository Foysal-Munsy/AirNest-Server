import { Module } from '@nestjs/common';
import { TravellerController } from './traveller.controller';
import { TravellerService } from './traveller.service';

@Module({
  imports: [],
  controllers: [TravellerController],
  providers: [TravellerService],
})
export class TravellerModule {}