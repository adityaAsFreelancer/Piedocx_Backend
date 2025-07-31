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
const dbconfig_1 = require("../dbconfig/dbconfig");
const Token_entity_1 = require("../Entities/Token.entity");
const createResponse_1 = require("../Helpers/createResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenRepo = dbconfig_1.AppDataSource.getRepository(Token_entity_1.Tokentbl);
const TokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokencode, expiretime } = req.body;
        if (!tokencode || !expiretime) {
            return (0, createResponse_1.createResponse)(res, 400, "tokencode and expiretime are required", null, false, true);
        }
        // Create token entity without JWT for now
        const data = TokenRepo.create({ tokenName: tokencode, expiretime });
        const savedToken = yield TokenRepo.save(data);
        // Generate JWT token
        const jwtToken = jsonwebtoken_1.default.sign({ id: savedToken === null || savedToken === void 0 ? void 0 : savedToken.id }, `${process.env.JWTSECERETKEY}`, { expiresIn: expiretime } // "2h", "3600", etc.
        );
        // Update saved record with token
        savedToken.token = jwtToken;
        const finalSaved = yield TokenRepo.save(savedToken);
        return (0, createResponse_1.createResponse)(res, 201, "Token Created successfully!", finalSaved, true, false);
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
});
exports.default = TokenController;
