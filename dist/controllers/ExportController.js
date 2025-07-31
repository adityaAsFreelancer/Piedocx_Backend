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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportSubmissionsToPDF = exports.exportSubmissionsToExcel = void 0;
const dbconfig_1 = require("../dbconfig/dbconfig");
const Submission_entity_1 = require("../Entities/Submission.entity");
const pdfkit_1 = __importDefault(require("pdfkit"));
const exceljs_1 = __importDefault(require("exceljs"));
// 📤 Export to Excel
const exportSubmissionsToExcel = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const submissions = yield dbconfig_1.AppDataSource.getRepository(Submission_entity_1.Submission).find({ relations: ['test'] });
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet('Submissions');
        worksheet.columns = [
            { header: 'User Email', key: 'userEmail', width: 30 },
            { header: 'Test Title', key: 'testTitle', width: 30 },
            { header: 'Submitted', key: 'submitted', width: 15 },
            { header: 'Submission Time', key: 'createdAt', width: 25 },
        ];
        submissions.forEach((submission) => {
            var _a;
            worksheet.addRow({
                userEmail: submission.userEmail,
                testTitle: (_a = submission.test) === null || _a === void 0 ? void 0 : _a.title,
                submitted: submission.submitted ? 'Yes' : 'No',
                createdAt: submission.createdAt,
            });
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=submissions.xlsx');
        yield workbook.xlsx.write(res);
        res.end();
    }
    catch (err) {
        res.status(500).json({ error: 'Error exporting Excel', details: err });
    }
});
exports.exportSubmissionsToExcel = exportSubmissionsToExcel;
// 📤 Export to PDF
const exportSubmissionsToPDF = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const submissions = yield dbconfig_1.AppDataSource.getRepository(Submission_entity_1.Submission).find({ relations: ['test'] });
        const doc = new pdfkit_1.default({ margin: 30 });
        res.setHeader('Content-Disposition', 'attachment; filename=submissions.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);
        doc.fontSize(20).text('Test Submissions Report', { align: 'center' });
        doc.moveDown();
        submissions.forEach((submission, i) => {
            var _a;
            doc
                .fontSize(12)
                .text(`#${i + 1}`)
                .text(`Email: ${submission.userEmail}`)
                .text(`Test: ${(_a = submission.test) === null || _a === void 0 ? void 0 : _a.title}`)
                .text(`Submitted: ${submission.submitted ? 'Yes' : 'No'}`)
                .text(`Time: ${submission.createdAt}`)
                .moveDown();
        });
        doc.end();
    }
    catch (err) {
        res.status(500).json({ error: 'Error exporting PDF', details: err });
    }
});
exports.exportSubmissionsToPDF = exportSubmissionsToPDF;
