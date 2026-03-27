import "dotenv/config";
import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: process.env.DATABASE_HOST,
  // port: parseInt(process.env.DATABASE_PORT || "5432"),
  // username: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_NAME,
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [path.resolve(__dirname, "typeorm/entities/**/*.{ts,js}")],
  migrations: [path.resolve(__dirname, "typeorm/migrations/**/*.ts")],
});
