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
exports.StudentSigninController = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const StudentSignup_entity_1 = require("../Entities/StudentSignup.entity");
const createResponse_1 = require("../Helpers/createResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const studentRepo = dbconfig_1.AppDataSource.getRepository(StudentSignup_entity_1.StudentSignup);
const StudentSigninController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const isLogin = yield studentRepo.findOne({ where: { email: email, password: password } });
        const token = yield jsonwebtoken_1.default.sign({ id: isLogin === null || isLogin === void 0 ? void 0 : isLogin.id, email: isLogin === null || isLogin === void 0 ? void 0 : isLogin.email }, `${process.env.JWTSECERETKEY}`, { expiresIn: "2h" });
        const finalresult = Object.assign(Object.assign({}, isLogin), { token });
        if (isLogin) {
            return (0, createResponse_1.createResponse)(res, 200, "Login success", finalresult, true, false);
        }
        else {
            return (0, createResponse_1.createResponse)(res, 404, "Invalid email or Password!", [], false, true);
        }
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
});
exports.StudentSigninController = StudentSigninController;
