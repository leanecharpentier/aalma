import 'dotenv/config';
import "reflect-metadata"
import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST ,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USER ,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [],
    migrations: [path.join(__dirname, "typeorm/migrations/**/*.js")],
    synchronize: true,
    logging: false,
})

