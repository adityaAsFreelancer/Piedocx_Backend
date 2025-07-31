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
exports.AdminController = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const Admin_entity_1 = require("../Entities/Admin.entity");
const createResponse_1 = require("../Helpers/createResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminRepo = dbconfig_1.AppDataSource.getRepository(Admin_entity_1.AdminTbl);
const AdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req === null || req === void 0 ? void 0 : req.body;
        const result = yield AdminRepo.findOne({ where: { email, password } });
        const token = yield jsonwebtoken_1.default.sign({ id: result === null || result === void 0 ? void 0 : result.id, email: result === null || result === void 0 ? void 0 : result.email }, `${process.env.JWTSECERETKEY}`, { expiresIn: "2h" });
        const finalresult = Object.assign(Object.assign({}, result), { token });
        if (result) {
            return (0, createResponse_1.createResponse)(res, 200, "Admin Login success", finalresult, true, false);
        }
        else {
            return (0, createResponse_1.createResponse)(res, 404, "Invalid email or Passwordss!", [], false, true);
        }
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
});
exports.AdminController = AdminController;
