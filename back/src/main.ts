import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "reflect-metadata";
import { AppDataSource } from "../DataSource";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
const cookieParser = require("cookie-parser");


async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Aalma API")
    .setDescription("")
    .setVersion("1.0")
    .addTag("aalma")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:3001",
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
