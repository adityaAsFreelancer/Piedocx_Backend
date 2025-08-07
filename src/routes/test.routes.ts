import express from 'express';
import {
  createTest,
  getAllTests,
  submitTest,
  getAllSubmissionsByEmail,
  getAllSubmissions,
} from '../controllers/TestController';
import {
  exportSubmissionsToExcel,
  exportSubmissionsToPDF,
} from '../controllers/ExportController';
import { deleteQuestion, getQuestionsByTest } from '../controllers/question.controller';
const Testrouter = express.Router();
Testrouter.post('/create', createTest);
Testrouter.get('/all', getAllTests);
Testrouter.post('/submit', submitTest);
Testrouter.get('/submissions', getAllSubmissionsByEmail);
Testrouter.get('/admin-submisson', getAllSubmissions);
Testrouter.get('/submissions/export/pdf', exportSubmissionsToPDF);
Testrouter.get('/submissions/export/excel', exportSubmissionsToExcel);
Testrouter.get('/questions/:testId', getQuestionsByTest);
Testrouter.delete('/delete/:id', deleteQuestion);

export default Testrouter;
