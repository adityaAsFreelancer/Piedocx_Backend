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
exports.uploadFileHelper = void 0;
const createResponse_1 = require("./createResponse");
const uploadFileHelper = (file, path, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (file === null || file === void 0 ? void 0 : file.mv(path + (file === null || file === void 0 ? void 0 : file.name), (err) => {
        if (err) {
            return (0, createResponse_1.createResponse)(res, 500, "Error during file upload", [], false, true);
        }
    }));
    return file === null || file === void 0 ? void 0 : file.name;
});
exports.uploadFileHelper = uploadFileHelper;
