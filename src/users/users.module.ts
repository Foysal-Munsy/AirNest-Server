import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'contactfoysal00@gmail.com',
          pass: 'vdoh bwnu wfap uwrh',
        },
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
