import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import "reflect-metadata";
import path from 'path';
import fileUpload from 'express-fileupload';
import { AppDataSource } from './dbconfig/dbconfig';
import StudentRoute from './routes/StudentRoute';
import AdminRoute from './routes/AdminRoute';
import Testrouter from './routes/test.routes';
import { scheduleCleanupJobs } from './cron/DeleteOldEntries';
import Otprouter from './routes/otpRoutes';
import {authLimiter} from './middleware/LimiterMiddleware'
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.post('/profilepics', async (req: any, res: any) => {
  try {
    if (!req.files || !req.files.photo) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const file = req.files.photo;
    const filename = Date.now() + '-' + file.name;
    const uploadPath = path.join(__dirname, 'profilepics', filename);
    file.mv(uploadPath, (err: any) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(500).json({ success: false, message: 'File upload failed' });
      }
      const imageUrl = `http://localhost:${process.env.PORT || 4000}profilepics/${filename}`;
      return res.json({ success: true, photo: filename, imageUrl });
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});
app.use('/profilepics', express.static(path.join(__dirname, 'profilepics')));
app.use(authLimiter,Otprouter)
app.use(authLimiter,StudentRoute);
app.use("/api",authLimiter,Testrouter)
app.use(authLimiter,AdminRoute);
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((err: any) => {
    console.log('❌ DB Error:', err);
  });
  scheduleCleanupJobs(); 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
