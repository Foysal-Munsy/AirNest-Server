import { Module } from '@nestjs/common';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { UserValidationPipe} from './pipes/user-validation.pipe';

@Module({
  controllers: [HostController],
  providers: [HostService, UserValidationPipe]
})
export class HostModule {}
