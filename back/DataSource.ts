import "dotenv/config";
import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [path.resolve(__dirname, "typeorm/entities/**/*.{ts,js}")],
  migrations: [path.resolve(__dirname, "typeorm/migrations/*.{ts,js}")],
});
