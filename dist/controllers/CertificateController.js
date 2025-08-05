"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCertificate = void 0;
const Certificate_entity_1 = require("../Entities/Certificate.entity");
const createResponse_1 = require("../Helpers/createResponse");
const CertificateController = async (req, res) => {
    try {
        const { tokenid, studentname, college, whatsappNumber, email, feedback, course } = req.body;
        if (!tokenid || !studentname || !college || !email || !feedback || !course) {
            return (0, createResponse_1.createResponse)(res, 400, "All required fields must be provided", null, false, true);
        }
        const cert = Certificate_entity_1.CertificateTbl.create({
            tokenid,
            studentname,
            college,
            whatsappNumber,
            email,
            feedback,
            course,
        });
        const saved = await Certificate_entity_1.CertificateTbl.save(cert);
        return (0, createResponse_1.createResponse)(res, 201, "Certificate added successfully", saved, true, false);
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
};
const getCertificate = async (req, res) => {
    try {
        const { tokenid, email } = req?.body;
        const result = await Certificate_entity_1.CertificateTbl.findOne({ where: { tokenid, email } });
        if (result) {
            return (0, createResponse_1.createResponse)(res, 201, "Certificate Fetched Successfullys", result, true, false);
        }
        else {
            return (0, createResponse_1.createResponse)(res, 404, "Invalid toknid or email", [], false, true);
        }
    }
    catch (err) {
    }
};
exports.getCertificate = getCertificate;
exports.default = CertificateController;
