import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CouponsModule } from './coupons/coupons.module';
import { CouponRequestModule } from './coupon_request/coupon_request.module';

import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: process.env.DB_PASSWORD, // database password
      database: process.env.DB_NAME, // database name
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CouponsModule,
    CouponRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
