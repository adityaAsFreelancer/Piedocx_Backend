import cron from 'node-cron';
import { AppDataSource } from '../dbconfig/dbconfig';
import { Submission } from '../Entities/Submission.entity';
import { Test } from '../Entities/Test.entity';

export const scheduleCleanupJobs = () => {
  // Runs every hour at minute 0
  cron.schedule('0 * * * *', async () => {
    console.log("🧹 Running cleanup for old submissions and tests...");

    const submissionRepo = AppDataSource.getRepository(Submission);
    const testRepo = AppDataSource.getRepository(Test);

    const now = new Date();
    const expirationDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

    try {
      // Delete old submissions
      await submissionRepo
        .createQueryBuilder()
        .delete()
        .where("createdAt < :expiration", { expiration: expirationDate })
        .execute();

      // Delete old tests (optional — if tests should also auto-delete)
      await testRepo
        .createQueryBuilder()
        .delete()
        .where("createdAt < :expiration", { expiration: expirationDate })
        .execute();

      console.log("✅ Old submissions and tests deleted successfully.");
    } catch (error) {
      console.error("❌ Error during cleanup cron job:", error);
    }
  });
};
