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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const dbconfig_1 = require("./dbconfig/dbconfig");
const StudentRoute_1 = __importDefault(require("./routes/StudentRoute"));
const AdminRoute_1 = __importDefault(require("./routes/AdminRoute"));
const test_routes_1 = __importDefault(require("./routes/test.routes"));
const DeleteOldEntries_1 = require("./cron/DeleteOldEntries");
const otpRoutes_1 = __importDefault(require("./routes/otpRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
app.post('/profilepics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files || !req.files.photo) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        const file = req.files.photo;
        const filename = Date.now() + '-' + file.name;
        const uploadPath = path_1.default.join(__dirname, 'profilepics', filename);
        file.mv(uploadPath, (err) => {
            if (err) {
                console.error('File upload error:', err);
                return res.status(500).json({ success: false, message: 'File upload failed' });
            }
            const imageUrl = `http://localhost:${process.env.PORT || 4000}profilepics/${filename}`;
            return res.json({ success: true, photo: filename, imageUrl });
        });
    }
    catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}));
app.use('/profilepics', express_1.default.static(path_1.default.join(__dirname, 'profilepics')));
app.use(otpRoutes_1.default);
app.use(StudentRoute_1.default);
app.use('/api', test_routes_1.default);
app.use("/api", AdminRoute_1.default);
dbconfig_1.AppDataSource.initialize()
    .then(() => {
    console.log('✅ Database connected successfully');
})
    .catch((err) => {
    console.log('❌ DB Error:', err);
});
(0, DeleteOldEntries_1.scheduleCleanupJobs)();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
