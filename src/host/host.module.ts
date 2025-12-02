import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { UserValidationPipe } from './pipes/user-validation.pipe';
import { HostEntity } from './host.entity';
import { PropertyEntity } from './property.entity';
import { BookingEntity } from './booking.entity';
import { HostProfileEntity } from './host-profile.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MailerService } from '../mailer/mailer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HostEntity,
      PropertyEntity,
      BookingEntity,
      HostProfileEntity,
    ]),
    AuthModule,
  ],
  controllers: [HostController],
  providers: [HostService, UserValidationPipe, JwtAuthGuard, MailerService],
})
export class HostModule {}
