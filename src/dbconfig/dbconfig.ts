import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: !isProduction,
  entities: ["../Entities/*.{ts,js}"],
  migrations: ["../migrations/*.{ts,js}"],
  subscribers: [],
  ssl: isProduction
    ? { rejectUnauthorized: true }
    : false,
  extra: isProduction
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {},
});
