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
const dbconfig_1 = require("../dbconfig/dbconfig");
const Services_entity_1 = require("../Entities/Services.entity");
const createResponse_1 = require("../Helpers/createResponse");
const ServicesRepo = dbconfig_1.AppDataSource.getRepository(Services_entity_1.Services);
const ServicesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req === null || req === void 0 ? void 0 : req.body;
        const result = ServicesRepo.create(title);
        const finalresult = yield ServicesRepo.save(result);
        if (finalresult) {
            return (0, createResponse_1.createResponse)(res, 201, "Services Added successfully!", finalresult, true, false);
        }
        else {
            return (0, createResponse_1.createResponse)(res, 400, "Services failed! not added", null, false, true);
        }
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
});
exports.default = ServicesController;
