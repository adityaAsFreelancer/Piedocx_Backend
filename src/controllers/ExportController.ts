import { Request, Response } from 'express';
import { AppDataSource } from '../dbconfig/dbconfig';
import { Submission } from '../Entities/Submission.entity';
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';

// 📤 Export to Excel
export const exportSubmissionsToExcel = async (_req: Request, res: Response) => {
  try {
    const submissions = await AppDataSource.getRepository(Submission).find({ relations: ['test'] });

    const workbook = new ExcelJS.Workbook();
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
  } catch (err) {
    res.status(500).json({ error: 'Error exporting Excel', details: err });
  }
};

// 📤 Export to PDF
export const exportSubmissionsToPDF = async (_req: Request, res: Response) => {
  try {
    const submissions = await AppDataSource.getRepository(Submission).find({ relations: ['test'] });

    const doc = new PDFDocument({ margin: 30 });
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
  } catch (err) {
    res.status(500).json({ error: 'Error exporting PDF', details: err });
  }
};
