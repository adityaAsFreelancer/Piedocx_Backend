"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleCleanupJobs = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const dbconfig_1 = require("../dbconfig/dbconfig");
const Submission_entity_1 = require("../Entities/Submission.entity");
const Test_entity_1 = require("../Entities/Test.entity");
const scheduleCleanupJobs = () => {
    // Runs every hour at minute 0
    node_cron_1.default.schedule('0 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("🧹 Running cleanup for old submissions and tests...");
        const submissionRepo = dbconfig_1.AppDataSource.getRepository(Submission_entity_1.Submission);
        const testRepo = dbconfig_1.AppDataSource.getRepository(Test_entity_1.Test);
        const now = new Date();
        const expirationDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
        try {
            // Delete old submissions
            yield submissionRepo
                .createQueryBuilder()
                .delete()
                .where("createdAt < :expiration", { expiration: expirationDate })
                .execute();
            // Delete old tests (optional — if tests should also auto-delete)
            yield testRepo
                .createQueryBuilder()
                .delete()
                .where("createdAt < :expiration", { expiration: expirationDate })
                .execute();
            console.log("✅ Old submissions and tests deleted successfully.");
        }
        catch (error) {
            console.error("❌ Error during cleanup cron job:", error);
        }
    }));
};
exports.scheduleCleanupJobs = scheduleCleanupJobs;
