"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotification = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const Notification_entity_1 = require("../Entities/Notification.entity");
const createResponse_1 = require("../Helpers/createResponse");
const NotificationRepo = dbconfig_1.AppDataSource.getRepository(Notification_entity_1.Notification);
const NotificationController = async (req, res) => {
    try {
        const { title, description } = req?.body;
        const notify = NotificationRepo.create({ title, description });
        const result = await NotificationRepo.save(notify);
        if (result) {
            return (0, createResponse_1.createResponse)(res, 201, "Notification Added successfully!", result, true, false);
        }
        else {
            return (0, createResponse_1.createResponse)(res, 400, "Notification failed! not added", null, false, true);
        }
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
};
const getNotification = async (req, res) => {
    try {
        const result = await NotificationRepo.find();
        if (result) {
            return (0, createResponse_1.createResponse)(res, 201, "Notification fetcheds successfully!", result, true, false);
        }
        else {
            return (0, createResponse_1.createResponse)(res, 400, "Notification failed! not added", null, false, true);
        }
    }
    catch (err) {
        return (0, createResponse_1.createResponse)(res, 500, "Internal Server Error!", err, false, true);
    }
};
exports.getNotification = getNotification;
exports.default = NotificationController;
