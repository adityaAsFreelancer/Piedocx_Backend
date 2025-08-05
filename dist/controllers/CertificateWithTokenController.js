"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateWithTokenController = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const Certificate_entity_1 = require("../Entities/Certificate.entity");
const createResponse_1 = require("../Helpers/createResponse");
const CertificateWithTokenController = async (req, res) => {
    try {
        const certWithToken = await dbconfig_1.AppDataSource
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
};
exports.CertificateWithTokenController = CertificateWithTokenController;
