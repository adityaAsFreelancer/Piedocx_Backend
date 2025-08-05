"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const UploadFilehelper_1 = require("../Helpers/UploadFilehelper");
const dbconfig_1 = require("../dbconfig/dbconfig");
const Clients_entity_1 = require("../Entities/Clients.entity");
const createResponse_1 = require("../Helpers/createResponse");
const ClientRepo = dbconfig_1.AppDataSource.getRepository(Clients_entity_1.Clienttbl);
const ClientController = async (req, res) => {
    try {
        // 💡 Safely access the image field
        const imageFile = req.files?.image;
        if (!imageFile) {
            return (0, createResponse_1.createResponse)(res, 400, "Image file is required", [], false, true);
        }
        const pathToSaveFile = path_1.default.join(__dirname, "../Image/");
        const savedFileName = await (0, UploadFilehelper_1.uploadFileHelper)(imageFile, pathToSaveFile, res);
        if (!savedFileName)
            return;
        const newClient = ClientRepo.create({
            image: savedFileName,
        });
        const finalData = await ClientRepo.save(newClient);
        return (0, createResponse_1.createResponse)(res, 201, "Client image uploaded successfully", finalData, true, false);
    }
    catch (error) {
        console.error("Upload error:", error);
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error", [], false, true);
    }
};
exports.default = ClientController;
