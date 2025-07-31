import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // set to false in production if using migrations
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
  entities: ["dist/Entities/**/*.js"],
  migrations: ["dist/Entities/migration/**/*.js"],
  subscribers: ["dist/Entities/subscriber/**/*.js"],
});
