import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // Neon DB URL from .env
  synchronize: true, // ❌ production me false karna better hai
  logging: true,

  ssl: {
    rejectUnauthorized: false, // Neon requires SSL
  },

  entities: [
    isProduction
      ? path.join(__dirname, "../Entities/**/*.js")
      : path.join(__dirname, "../Entities/**/*.ts"),
  ],

  migrations: [
    isProduction
      ? path.join(__dirname, "../migrations/**/*.js")
      : path.join(__dirname, "../migrations/**/*.ts"),
  ],

  subscribers: [
    isProduction
      ? path.join(__dirname, "../subscribers/**/*.js")
      : path.join(__dirname, "../subscribers/**/*.ts"),
  ],
});
