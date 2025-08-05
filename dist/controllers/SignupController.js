"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRegister = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const StudentSignup_entity_1 = require("../Entities/StudentSignup.entity");
const createResponse_1 = require("../Helpers/createResponse");
const studentRepo = dbconfig_1.AppDataSource.getRepository(StudentSignup_entity_1.StudentSignup);
const StudentRegister = async (req, res) => {
    try {
        const studentInfo = req.body;
        const isExist = await studentRepo.findOne({ where: { email: studentInfo.email } });
        if (isExist) {
            return (0, createResponse_1.createResponse)(res, 208, "User Already Exists!", isExist, false, true);
        }
        const newStudent = studentRepo.create(studentInfo);
        const result = await studentRepo.save(newStudent);
        if (result) {
            return (0, createResponse_1.createResponse)(res, 201, "User registered successfully!", result, true, false);
        }
        else {
            return (0, createResponse_1.createResponse)(res, 400, "User registration failed!", null, false, true);
        }
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
};
exports.StudentRegister = StudentRegister;
