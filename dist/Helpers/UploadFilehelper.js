"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileHelper = void 0;
const path_1 = __importDefault(require("path"));
const uploadFileHelper = (file, uploadPath, res) => {
    return new Promise((resolve, reject) => {
        const filename = Date.now() + '-' + file.name;
        const fullPath = path_1.default.join(uploadPath, filename);
        file.mv(fullPath, (err) => {
            if (err) {
                console.error('Upload failed:', err);
                reject(err);
            }
            else {
                resolve(filename);
            }
        });
    });
};
exports.uploadFileHelper = uploadFileHelper;
