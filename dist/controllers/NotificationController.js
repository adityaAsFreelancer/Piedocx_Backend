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
exports.getNotification = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const Notification_entity_1 = require("../Entities/Notification.entity");
const createResponse_1 = require("../Helpers/createResponse");
const NotificationRepo = dbconfig_1.AppDataSource.getRepository(Notification_entity_1.Notification);
const NotificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req === null || req === void 0 ? void 0 : req.body;
        const notify = NotificationRepo.create({ title, description });
        const result = yield NotificationRepo.save(notify);
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
});
const getNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield NotificationRepo.find();
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
});
exports.getNotification = getNotification;
exports.default = NotificationController;
