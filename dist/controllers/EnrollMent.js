"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollMentController = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const StudentEnrollment_entity_1 = require("../Entities/StudentEnrollment.entity");
const createResponse_1 = require("../Helpers/createResponse");
const StudentEnrollMent = dbconfig_1.AppDataSource.getRepository(StudentEnrollment_entity_1.EnrollMent);
const EnrollMentController = async (req, res) => {
    try {
        const StudentEnroll = req?.body;
        const newStudentEnrollMent = StudentEnrollMent.create(StudentEnroll);
        const result = await StudentEnrollMent.save(newStudentEnrollMent);
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
};
exports.EnrollMentController = EnrollMentController;
