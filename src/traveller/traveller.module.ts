import { Module } from '@nestjs/common';
import { TravellerController } from './traveller.controller';
import { TravellerService } from './traveller.service';
import { TravellerEntity } from './traveller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TravellerEntity])],
  controllers: [TravellerController],
  providers: [TravellerService],
})
export class TravellerModule {}