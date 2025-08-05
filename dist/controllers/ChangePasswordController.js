"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../dbconfig/dbconfig");
const StudentSignup_entity_1 = require("../Entities/StudentSignup.entity");
const createResponse_1 = require("../Helpers/createResponse");
const studentRepo = dbconfig_1.AppDataSource.getRepository(StudentSignup_entity_1.StudentSignup);
const ChangePasswordController = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const { userid } = req.query;
        if (!oldPassword || !newPassword || !confirmPassword) {
            return (0, createResponse_1.createResponse)(res, 400, "All fields are required", null, false, true);
        }
        if (newPassword !== confirmPassword) {
            return (0, createResponse_1.createResponse)(res, 400, "New password and repeat password must match", null, false, true);
        }
        const user = await studentRepo.findOne({ where: { id: userid } });
        if (!user) {
            return (0, createResponse_1.createResponse)(res, 404, "User not found", null, false, true);
        }
        if (user.password !== oldPassword) {
            return (0, createResponse_1.createResponse)(res, 404, "oldPassword is not match", null, false, true);
        }
        user.password = newPassword;
        // Save updated password
        await studentRepo.save(user);
        return (0, createResponse_1.createResponse)(res, 200, "Password changed successfully", null, true, false);
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
};
exports.default = ChangePasswordController;
