import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TravellerController } from './traveller/traveller.controller';
import { TravellerService } from './traveller/traveller.service';
import { TravellerModule } from './traveller/traveller.module';

@Module({
  imports: [TravellerModule],
  controllers: [AppController,TravellerController],
  providers: [AppService, TravellerService],
})
export class AppModule {}
