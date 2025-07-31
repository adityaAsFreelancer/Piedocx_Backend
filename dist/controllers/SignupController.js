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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRegister = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const StudentSignup_entity_1 = require("../Entities/StudentSignup.entity");
const createResponse_1 = require("../Helpers/createResponse");
const studentRepo = dbconfig_1.AppDataSource.getRepository(StudentSignup_entity_1.StudentSignup);
const StudentRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentInfo = req.body;
        const isExist = yield studentRepo.findOne({ where: { email: studentInfo.email } });
        if (isExist) {
            return (0, createResponse_1.createResponse)(res, 208, "User Already Exists!", isExist, false, true);
        }
        const newStudent = studentRepo.create(studentInfo);
        const result = yield studentRepo.save(newStudent);
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
});
exports.StudentRegister = StudentRegister;
