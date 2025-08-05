"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createResponse_1 = require("../Helpers/createResponse");
const verifyToken = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    await jsonwebtoken_1.default.verify(token, `${process.env.JWTSECERETKEY}`, (err, decode) => {
        if (err) {
            (0, createResponse_1.createResponse)(res, 401, "Invalid token!", [], false, true);
        }
        else {
            req.user = decode;
            next();
        }
    });
};
exports.verifyToken = verifyToken;
