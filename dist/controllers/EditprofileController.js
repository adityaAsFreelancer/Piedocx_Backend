"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../dbconfig/dbconfig");
const StudentSignup_entity_1 = require("../Entities/StudentSignup.entity");
const createResponse_1 = require("../Helpers/createResponse");
const UploadFilehelper_1 = require("../Helpers/UploadFilehelper");
const path_1 = __importDefault(require("path"));
const studentRepo = dbconfig_1.AppDataSource.getRepository(StudentSignup_entity_1.StudentSignup);
const EditProfileController = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json((0, createResponse_1.createResponse)(res, 400, 'All fields are required', [], false, true));
        }
        const student = await studentRepo.findOne({ where: { email } });
        if (!student) {
            return res.status(404).json((0, createResponse_1.createResponse)(res, 404, 'Student not found', [], false, true));
        }
        // ✅ Only update profile photo if file is passed
        if (req.files?.photo) {
            const photo = req.files.photo;
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(photo.mimetype)) {
                return res.status(400).json((0, createResponse_1.createResponse)(res, 400, 'Only JPG, JPEG, PNG formats are allowed', [], false, true));
            }
            const uploadPath = path_1.default.join(__dirname, '../profilepics/');
            const uploadedPhotoName = await (0, UploadFilehelper_1.uploadFileHelper)(photo, uploadPath, res);
            student.profile = uploadedPhotoName;
        }
        student.name = name;
        student.mobile = phone;
        await studentRepo.save(student);
        return res.status(200).json((0, createResponse_1.createResponse)(res, 200, 'Profile updated successfully', student, true, false));
    }
    catch (err) {
        console.error('Edit Profile Error:', err);
        return res.status(500).json((0, createResponse_1.createResponse)(res, 500, 'Something went wrong', [], false, true));
    }
};
exports.default = EditProfileController;
