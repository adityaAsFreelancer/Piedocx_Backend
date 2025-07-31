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
exports.CertificateWithTokenController = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const Certificate_entity_1 = require("../Entities/Certificate.entity");
const createResponse_1 = require("../Helpers/createResponse");
const CertificateWithTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const certWithToken = yield dbconfig_1.AppDataSource
            .getRepository(Certificate_entity_1.CertificateTbl)
            .createQueryBuilder("certificate")
            .leftJoinAndSelect("Token", "token", "certificate.tokenid = token.id")
            .select([
            "certificate.id",
            "certificate.studentname",
            "certificate.college",
            "certificate.email",
            "certificate.course",
            "certificate.feedack",
            "token.token",
            "token.expiretime"
        ])
            .getRawMany();
        return (0, createResponse_1.createResponse)(res, 200, "Certificates fetched successfully", certWithToken, true, false);
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal server error", err, false, true);
    }
});
exports.CertificateWithTokenController = CertificateWithTokenController;
