import { Module } from '@nestjs/common';
import { TravellerController } from './traveller.controller';
import { TravellerService } from './traveller.service';
import { TravellerEntity } from './traveller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { Passport } from './passport.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([TravellerEntity,Ticket,Passport]),


  PassportModule,
  JwtModule.register({
    secret: 'my-secret_Taushif',
    signOptions: {expiresIn:'1hr'},
  }),],
  controllers: [TravellerController],
  providers: [TravellerService,JwtStrategy],
})
export class TravellerModule {}