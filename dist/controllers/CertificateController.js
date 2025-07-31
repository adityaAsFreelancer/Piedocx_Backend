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
exports.getCertificate = void 0;
const Certificate_entity_1 = require("../Entities/Certificate.entity");
const createResponse_1 = require("../Helpers/createResponse");
const CertificateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const saved = yield Certificate_entity_1.CertificateTbl.save(cert);
        return (0, createResponse_1.createResponse)(res, 201, "Certificate added successfully", saved, true, false);
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
});
const getCertificate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokenid, email } = req === null || req === void 0 ? void 0 : req.body;
        const result = yield Certificate_entity_1.CertificateTbl.findOne({ where: { tokenid, email } });
        if (result) {
            return (0, createResponse_1.createResponse)(res, 201, "Certificate Fetched Successfullys", result, true, false);
        }
        else {
            return (0, createResponse_1.createResponse)(res, 404, "Invalid toknid or email", [], false, true);
        }
    }
    catch (err) {
    }
});
exports.getCertificate = getCertificate;
exports.default = CertificateController;
