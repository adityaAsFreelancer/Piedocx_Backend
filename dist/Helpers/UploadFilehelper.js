"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileHelper = void 0;
const createResponse_1 = require("./createResponse");
const uploadFileHelper = async (file, path, res) => {
    await file?.mv(path + file?.name, (err) => {
        if (err) {
            return (0, createResponse_1.createResponse)(res, 500, "Error during file upload", [], false, true);
        }
    });
    return file?.name;
};
exports.uploadFileHelper = uploadFileHelper;
