import { Module } from '@nestjs/common';
import { TravellerController } from './traveller.controller';
import { TravellerService } from './traveller.service';
import { TravellerEntity } from './traveller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { Passport } from './passport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TravellerEntity,Ticket,Passport])],
  controllers: [TravellerController],
  providers: [TravellerService],
})
export class TravellerModule {}