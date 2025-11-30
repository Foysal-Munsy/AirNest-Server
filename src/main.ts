import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(session({
  //   secret: 'my-secret_Taushif',
  //   resave:false,
  //   saveUninitialized:false,
  //   cookie:{
  //     maxAge:30000
  //   }
  // }),);
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    transform: true,
    forbidNonWhitelisted:true,
    stopAtFirstError:true
  }),);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
