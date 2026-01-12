import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { formatValidationError } from './common/utils/validation-error.formatter';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) =>
        new BadRequestException({
          statusCode: 400,
          message: formatValidationError(errors),
        }),
    }),
  );
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
