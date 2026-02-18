import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { AppDataSource } from '../DataSource';

async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
