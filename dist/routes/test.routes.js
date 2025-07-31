"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TestController_1 = require("../controllers/TestController");
const ExportController_1 = require("../controllers/ExportController");
const question_controller_1 = require("../controllers/question.controller");
const Testrouter = express_1.default.Router();
Testrouter.post('/create', TestController_1.createTest);
Testrouter.get('/all', TestController_1.getAllTests);
Testrouter.post('/submit', TestController_1.submitTest);
Testrouter.get('/submissions', TestController_1.getAllSubmissions);
Testrouter.get('/submissions/export/pdf', ExportController_1.exportSubmissionsToPDF);
Testrouter.get('/submissions/export/excel', ExportController_1.exportSubmissionsToExcel);
Testrouter.get('/questions/:testId', question_controller_1.getQuestionsByTest);
exports.default = Testrouter;
