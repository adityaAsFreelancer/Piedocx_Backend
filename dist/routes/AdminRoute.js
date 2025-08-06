"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controllers/AdminController");
const ClientContoller_1 = __importDefault(require("../controllers/ClientContoller"));
const TokenController_1 = __importDefault(require("../controllers/TokenController"));
const ServicesContoller_1 = __importDefault(require("../controllers/ServicesContoller"));
const ProgrammingController_1 = __importDefault(require("../controllers/ProgrammingController"));
const CheckTokenController_1 = __importDefault(require("../middleware/CheckTokenController"));
const CertificateController_1 = __importStar(require("../controllers/CertificateController"));
const NotificationController_1 = __importDefault(require("../controllers/NotificationController"));
const PdfController_1 = require("../controllers/PdfController");
const question_controller_1 = require("../controllers/question.controller");
const PlaylistController_1 = require("../controllers/PlaylistController");
const VideoController_1 = require("../controllers/VideoController");
const AdminRoute = express_1.default.Router();
AdminRoute.post('/admin-login', AdminController_1.AdminController);
AdminRoute.post('/admin-client', ClientContoller_1.default);
AdminRoute.post('/admin-token', TokenController_1.default);
AdminRoute.post('/admin-services', ServicesContoller_1.default);
AdminRoute.post('/admin-programming', ProgrammingController_1.default);
AdminRoute.post('/admin-certificate', CheckTokenController_1.default, CertificateController_1.default);
AdminRoute.post('/admin-certificate-with-token', CertificateController_1.getCertificate);
AdminRoute.post('/admin-notification', NotificationController_1.default);
AdminRoute.post('/admin-upload-pdf', PdfController_1.UploadPdf);
AdminRoute.post('/add', question_controller_1.addQuestionToTest);
AdminRoute.post('/admin-playlist-create', PlaylistController_1.createPlaylist);
AdminRoute.get('/admin-playlist-all', PlaylistController_1.getAllPlaylists);
AdminRoute.post('/admin-playlist-add', VideoController_1.addVideoToPlaylist);
exports.default = AdminRoute;
