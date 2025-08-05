"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../dbconfig/dbconfig");
const Token_entity_1 = require("../Entities/Token.entity");
const createResponse_1 = require("../Helpers/createResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenRepo = dbconfig_1.AppDataSource.getRepository(Token_entity_1.Tokentbl);
const TokenController = async (req, res) => {
    try {
        const { tokencode, expiretime } = req.body;
        if (!tokencode || !expiretime) {
            return (0, createResponse_1.createResponse)(res, 400, "tokencode and expiretime are required", null, false, true);
        }
        // Create token entity without JWT for now
        const data = TokenRepo.create({ tokenName: tokencode, expiretime });
        const savedToken = await TokenRepo.save(data);
        // Generate JWT token
        const jwtToken = jsonwebtoken_1.default.sign({ id: savedToken?.id }, `${process.env.JWTSECERETKEY}`, { expiresIn: expiretime } // "2h", "3600", etc.
        );
        // Update saved record with token
        savedToken.token = jwtToken;
        const finalSaved = await TokenRepo.save(savedToken);
        return (0, createResponse_1.createResponse)(res, 201, "Token Created successfully!", finalSaved, true, false);
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
};
exports.default = TokenController;
