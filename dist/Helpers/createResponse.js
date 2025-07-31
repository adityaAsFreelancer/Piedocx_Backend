"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = void 0;
const createResponse = (res, code = 200, message = '', data = [], success = true, error = false) => {
    res.json({
        code,
        message,
        success,
        error,
        data,
    });
};
exports.createResponse = createResponse;
