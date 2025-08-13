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
import Otprouter from './routes/otpRoutes';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/profilepics', express.static(path.join(__dirname, 'profilepics')));
app.use(Otprouter)
app.use(StudentRoute);
app.use("/api",Testrouter)
app.use(AdminRoute);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((err: any) => {
    console.log('❌ DB Error:', err);
  });
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
