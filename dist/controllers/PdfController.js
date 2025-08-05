"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPdfs = exports.UploadPdf = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const Pdf_entity_1 = require("../Entities/Pdf.entity");
const UploadFilehelper_1 = require("../Helpers/UploadFilehelper");
const createResponse_1 = require("../Helpers/createResponse");
const path_1 = __importDefault(require("path"));
const pdfRepo = dbconfig_1.AppDataSource.getRepository(Pdf_entity_1.Pdftbl);
const UploadPdf = async (req, res) => {
    try {
        const { title, size, url } = req.body;
        const thumbnail = req.files?.thumbnail;
        if (!title || !url) {
            return (0, createResponse_1.createResponse)(res, 400, "Title and URL are required", [], false, true);
        }
        if (!thumbnail) {
            return (0, createResponse_1.createResponse)(res, 400, "Image file is required", [], false, true);
        }
        const thumbnailPath = path_1.default.join(__dirname, "../PDF/");
        const savedFileName = await (0, UploadFilehelper_1.uploadFileHelper)(thumbnail, thumbnailPath, res);
        const newPdf = pdfRepo.create({
            title,
            size,
            url,
            thumbnail: savedFileName,
        });
        const savedPdf = await pdfRepo.save(newPdf);
        return (0, createResponse_1.createResponse)(res, 201, "PDF uploaded successfully", savedPdf, true, false);
    }
    catch (error) {
        console.error("Upload Error:", error);
        return (0, createResponse_1.createResponse)(res, 500, "Internal server error", [], false, true);
    }
};
exports.UploadPdf = UploadPdf;
const getAllPdfs = async (req, res) => {
    try {
        const pdfs = await pdfRepo.find({
            order: { createdAt: "DESC" },
        });
        return (0, createResponse_1.createResponse)(res, 200, "PDFs fetched successfully", pdfs, true, false);
    }
    catch (error) {
        console.error("Fetch Error:", error);
        return (0, createResponse_1.createResponse)(res, 500, "Internal server error", [], false, true);
    }
};
exports.getAllPdfs = getAllPdfs;
