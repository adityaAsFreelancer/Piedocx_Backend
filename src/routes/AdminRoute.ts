import express from 'express'
import { AdminController } from '../controllers/AdminController';
import ClientController from '../controllers/ClientContoller';
import TokenController from '../controllers/TokenController';
import ServicesController from '../controllers/ServicesContoller';
import ProgrammingController from '../controllers/ProgrammingController';
import CheckTokenMiddleware from '../middleware/CheckTokenController';
import { CertificateWithTokenController } from '../controllers/CertificateWithTokenController';
import CertificateController, { getCertificate } from '../controllers/CertificateController';
import NotificationController from '../controllers/NotificationController';
import {UploadPdf} from '../controllers/PdfController'
import { addQuestionToTest } from '../controllers/question.controller';
import { createPlaylist, getAllPlaylists } from '../controllers/PlaylistController';
import { addVideoToPlaylist } from '../controllers/VideoController';

const AdminRoute=express.Router()
AdminRoute.post('/admin-login',AdminController)
AdminRoute.post('/admin-client',ClientController)
AdminRoute.post('/admin-token',TokenController)
AdminRoute.post('/admin-services',ServicesController)
AdminRoute.post('/admin-programming',ProgrammingController)
AdminRoute.post('/admin-certificate', CheckTokenMiddleware,CertificateController)
AdminRoute.post('/admin-certificate-with-token', getCertificate)
AdminRoute.post('/admin-notification', NotificationController)
AdminRoute.post('/admin-upload-pdf', UploadPdf)
AdminRoute.post('/add', addQuestionToTest)
AdminRoute.post('/admin-playlist-create', createPlaylist);
AdminRoute.get('/admin-playlist-all', getAllPlaylists);
AdminRoute.post('/admin-playlist-add', addVideoToPlaylist);

export default AdminRoute;