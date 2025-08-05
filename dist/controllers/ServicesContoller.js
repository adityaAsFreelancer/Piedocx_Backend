"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../dbconfig/dbconfig");
const Services_entity_1 = require("../Entities/Services.entity");
const createResponse_1 = require("../Helpers/createResponse");
const ServicesRepo = dbconfig_1.AppDataSource.getRepository(Services_entity_1.Services);
const ServicesController = async (req, res) => {
    try {
        const title = req?.body;
        const result = ServicesRepo.create(title);
        const finalresult = await ServicesRepo.save(result);
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
};
exports.default = ServicesController;
