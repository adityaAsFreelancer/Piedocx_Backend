"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production";
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: !isProduction,
    entities: [__dirname + "/entities/*.{ts,js}"],
    migrations: [__dirname + "/migrations/*.{ts,js}"],
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
