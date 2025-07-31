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
exports.EnrollMentController = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const StudentEnrollment_entity_1 = require("../Entities/StudentEnrollment.entity");
const createResponse_1 = require("../Helpers/createResponse");
const StudentEnrollMent = dbconfig_1.AppDataSource.getRepository(StudentEnrollment_entity_1.EnrollMent);
const EnrollMentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const StudentEnroll = req === null || req === void 0 ? void 0 : req.body;
        const newStudentEnrollMent = StudentEnrollMent.create(StudentEnroll);
        const result = yield StudentEnrollMent.save(newStudentEnrollMent);
        if (result) {
            return (0, createResponse_1.createResponse)(res, 201, "EnrollMent successfully!", result, true, false);
        }
        else {
            return (0, createResponse_1.createResponse)(res, 400, "EnrollMent failed!", null, false, true);
        }
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
});
exports.EnrollMentController = EnrollMentController;
