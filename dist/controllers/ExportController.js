"use strict";
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
const exportSubmissionsToExcel = async (_req, res) => {
    try {
        const submissions = await dbconfig_1.AppDataSource.getRepository(Submission_entity_1.Submission).find({ relations: ['test'] });
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet('Submissions');
        worksheet.columns = [
            { header: 'User Email', key: 'userEmail', width: 30 },
            { header: 'Test Title', key: 'testTitle', width: 30 },
            { header: 'Submitted', key: 'submitted', width: 15 },
            { header: 'Submission Time', key: 'createdAt', width: 25 },
        ];
        submissions.forEach((submission) => {
            worksheet.addRow({
                userEmail: submission.userEmail,
                testTitle: submission.test?.title,
                submitted: submission.submitted ? 'Yes' : 'No',
                createdAt: submission.createdAt,
            });
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=submissions.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    }
    catch (err) {
        res.status(500).json({ error: 'Error exporting Excel', details: err });
    }
};
exports.exportSubmissionsToExcel = exportSubmissionsToExcel;
// 📤 Export to PDF
const exportSubmissionsToPDF = async (_req, res) => {
    try {
        const submissions = await dbconfig_1.AppDataSource.getRepository(Submission_entity_1.Submission).find({ relations: ['test'] });
        const doc = new pdfkit_1.default({ margin: 30 });
        res.setHeader('Content-Disposition', 'attachment; filename=submissions.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);
        doc.fontSize(20).text('Test Submissions Report', { align: 'center' });
        doc.moveDown();
        submissions.forEach((submission, i) => {
            doc
                .fontSize(12)
                .text(`#${i + 1}`)
                .text(`Email: ${submission.userEmail}`)
                .text(`Test: ${submission.test?.title}`)
                .text(`Submitted: ${submission.submitted ? 'Yes' : 'No'}`)
                .text(`Time: ${submission.createdAt}`)
                .moveDown();
        });
        doc.end();
    }
    catch (err) {
        res.status(500).json({ error: 'Error exporting PDF', details: err });
    }
};
exports.exportSubmissionsToPDF = exportSubmissionsToPDF;
