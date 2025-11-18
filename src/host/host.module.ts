import { Module } from '@nestjs/common';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { UserValidationPipe} from './pipes/user-validation.pipe';
import { HostEntity } from "./host.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([HostEntity]),],
  controllers: [HostController],
  providers: [HostService, UserValidationPipe]
})
export class HostModule {}
