"use strict";
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
const otpRoutes_1 = __importDefault(require("./routes/otpRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
app.use('/profilepics', express_1.default.static(path_1.default.join(__dirname, 'profilepics')));
app.use(otpRoutes_1.default);
app.use(StudentRoute_1.default);
app.use("/api", test_routes_1.default);
app.use(AdminRoute_1.default);
dbconfig_1.AppDataSource.initialize()
    .then(() => {
    console.log('✅ Database connected successfully');
})
    .catch((err) => {
    console.log('❌ DB Error:', err);
});
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
