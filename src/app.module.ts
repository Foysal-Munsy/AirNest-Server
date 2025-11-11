import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HostModule } from './host/host.module';
import { HostController } from './host/host.controller';
import { HostService } from './host/host.service';

@Module({
  imports: [HostModule],
  controllers: [AppController,HostController],
  providers: [AppService,HostService],
})
export class AppModule {}
