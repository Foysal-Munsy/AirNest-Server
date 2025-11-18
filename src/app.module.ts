import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HostModule } from './host/host.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sifat',        
      database: 'air-host',     
      autoLoadEntities: true,
      synchronize: true,
    }),
    HostModule,                 
  ],
  controllers: [AppController], 
  providers: [AppService],      
})
export class AppModule {}
