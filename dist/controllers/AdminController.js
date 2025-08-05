"use strict";
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
const AdminController = async (req, res) => {
    try {
        const { email, password } = req?.body;
        const result = await AdminRepo.findOne({ where: { email, password } });
        const token = await jsonwebtoken_1.default.sign({ id: result?.id, email: result?.email }, `${process.env.JWTSECERETKEY}`, { expiresIn: "2h" });
        const finalresult = { ...result, token };
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
};
exports.AdminController = AdminController;
