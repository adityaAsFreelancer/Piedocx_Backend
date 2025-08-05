"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const createResponse_1 = require("../Helpers/createResponse");
const UploadFilehelper_1 = require("../Helpers/UploadFilehelper");
const dbconfig_1 = require("../dbconfig/dbconfig");
const Programming_entity_1 = require("../Entities/Programming.entity");
const ProgrammingRepo = dbconfig_1.AppDataSource.getRepository(Programming_entity_1.Programming);
const ProgrammingController = async (req, res) => {
    try {
        const { title } = req.body; // ✅ correctly extract only 'title'
        const image = req?.files?.image;
        if (!title) {
            return (0, createResponse_1.createResponse)(res, 400, "Title is required", [], false, true);
        }
        if (!image) {
            return (0, createResponse_1.createResponse)(res, 400, "Image file is required", [], false, true);
        }
        const pathToSaveFile = path_1.default.join(__dirname, "../Image/");
        const savedFileName = await (0, UploadFilehelper_1.uploadFileHelper)(image, pathToSaveFile, res);
        if (!savedFileName)
            return;
        const newProgramming = ProgrammingRepo.create({
            image: savedFileName,
            title: title,
        });
        const result = await ProgrammingRepo.save(newProgramming);
        return (0, createResponse_1.createResponse)(res, 201, "Programming added successfully", result, true, false);
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
};
exports.default = ProgrammingController;
