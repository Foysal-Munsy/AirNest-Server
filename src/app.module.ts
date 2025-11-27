import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TravellerModule } from './traveller/traveller.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TravellerModule, TypeOrmModule.forRoot(
{ type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: 'Taushif@321',
database: 'AirnestTraveller',
autoLoadEntities: true,
synchronize: true,
} ), 
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
