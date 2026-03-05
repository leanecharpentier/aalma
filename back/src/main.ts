import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { AppDataSource } from '../DataSource';
const cookieParser = require('cookie-parser');


async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:3001",
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
