import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,

  ssl: isProduction ? { rejectUnauthorized: false } : false,

  entities: isProduction
    ? [path.join(__dirname, "../Entities/**/*.js")]
    : [path.join(__dirname, "../Entities/**/*.ts")],

  migrations: isProduction
    ? [path.join(__dirname, "../Entities/migration/**/*.js")]
    : [path.join(__dirname, "../Entities/migration/**/*.ts")],

  subscribers: isProduction
    ? [path.join(__dirname, "../Entities/subscriber/**/*.js")]
    : [path.join(__dirname, "../Entities/subscriber/**/*.ts")],
});
