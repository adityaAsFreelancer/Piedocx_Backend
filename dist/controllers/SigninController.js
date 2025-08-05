"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSigninController = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const StudentSignup_entity_1 = require("../Entities/StudentSignup.entity");
const createResponse_1 = require("../Helpers/createResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const studentRepo = dbconfig_1.AppDataSource.getRepository(StudentSignup_entity_1.StudentSignup);
const StudentSigninController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isLogin = await studentRepo.findOne({ where: { email: email, password: password } });
        const token = await jsonwebtoken_1.default.sign({ id: isLogin?.id, email: isLogin?.email }, `${process.env.JWTSECERETKEY}`, { expiresIn: "2h" });
        const finalresult = { ...isLogin, token };
        if (isLogin) {
            return (0, createResponse_1.createResponse)(res, 200, "Login success", finalresult, true, false);
        }
        else {
            return (0, createResponse_1.createResponse)(res, 404, "Invalid email or Password!", [], false, true);
        }
    }
    catch (err) {
        console.log(err);
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
};
exports.StudentSigninController = StudentSigninController;
