"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../dbconfig/dbconfig");
const Token_entity_1 = require("../Entities/Token.entity");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenRepo = dbconfig_1.AppDataSource.getRepository(Token_entity_1.Tokentbl);
const CheckTokenMiddleware = async (req, res, next) => {
    try {
        // Token from header (preferred)
        const headerToken = req.headers.authorization?.split(" ")[1];
        const bodyToken = req.body.tokencode;
        const token = headerToken || bodyToken;
        if (!token) {
            return res.status(400).json({
                code: 400,
                message: "Token is required (in header or body)",
                success: false,
                error: true,
                data: null,
            });
        }
        // Verify JWT signature & expiry
        try {
            jsonwebtoken_1.default.verify(token, `${process.env.JWTSECERETKEY}`);
        }
        catch (err) {
            return res.status(401).json({
                code: 401,
                message: err.name === "TokenExpiredError" ? "JWT token expired" : "JWT token invalid",
                success: false,
                error: true,
                data: null,
            });
        }
        // Verify in DB (manual expiry check)
        const tokenData = await TokenRepo.findOne({ where: { token: token } });
        if (!tokenData) {
            return res.status(404).json({
                code: 404,
                message: "Token not found in database",
                success: false,
                error: true,
                data: null,
            });
        }
        const now = new Date();
        const expire = new Date(tokenData.expiretime);
        if (now > expire) {
            return res.status(401).json({
                code: 401,
                message: "Token expired (based on DB expiry time)",
                success: false,
                error: true,
                data: null,
            });
        }
        // Pass control to next middleware or controller
        next();
    }
    catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
            success: false,
            error: true,
            data: error,
        });
    }
};
exports.default = CheckTokenMiddleware;
