import express from 'express'
import { StudentRegister } from '../controllers/SignupController';
import { StudentSigninController } from '../controllers/SigninController';
import { EnrollMentController } from '../controllers/EnrollMent';
import { verifyToken } from '../middleware/VerifyToken';
import ChangePasswordController from '../controllers/ChangePasswordController';
import EditProfileController from '../controllers/EditprofileController';
import { getNotification } from '../controllers/NotificationController';
import { getAllPdfs } from '../controllers/PdfController';

const StudentRoute = express.Router();
StudentRoute.post('/student-register', StudentRegister)
StudentRoute.post('/student-login', StudentSigninController)
StudentRoute.post('/student-enrollment', EnrollMentController)
StudentRoute.post('/student-changepssword', ChangePasswordController)
StudentRoute.post('/student-updateProfile', EditProfileController)
StudentRoute.get('/student-notification', getNotification)
StudentRoute.get('/student-get-pdfs', getAllPdfs)

export default StudentRoute;
