"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubmissions = exports.submitTest = exports.getAllTests = exports.createTest = void 0;
const Test_entity_1 = require("../Entities/Test.entity");
const Submission_entity_1 = require("../Entities/Submission.entity");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const CreateTest_dto_1 = require("../dto/CreateTest.dto");
const createResponse_1 = require("../Helpers/createResponse");
const dbconfig_1 = require("../dbconfig/dbconfig");
const TestRepo = dbconfig_1.AppDataSource.getRepository(Test_entity_1.Test);
// ✅ Create a new test
const createTest = async (req, res) => {
    try {
        const dto = (0, class_transformer_1.plainToInstance)(CreateTest_dto_1.CreateTestDTO, req.body);
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            return (0, createResponse_1.createResponse)(res, 400, 'Validation failed', errors.map((err) => err.constraints), true, false);
        }
        const { title, questions, marks, time } = dto;
        const test = TestRepo.create({ title, questions, marks, time });
        await TestRepo.save(test);
        return (0, createResponse_1.createResponse)(res, 201, 'Test created successfully', test, false, true);
    }
    catch (error) {
        console.error(error);
        return (0, createResponse_1.createResponse)(res, 500, 'Error creating test', error, true, false);
    }
};
exports.createTest = createTest;
// ✅ Get all tests
const getAllTests = async (_req, res) => {
    try {
        const tests = await TestRepo.find();
        return (0, createResponse_1.createResponse)(res, 200, 'All tests fetched', tests, false, true);
    }
    catch (error) {
        return (0, createResponse_1.createResponse)(res, 500, 'Error fetching tests', error, true, false);
    }
};
exports.getAllTests = getAllTests;
// ✅ Submit a test
const submitTest = async (req, res) => {
    try {
        const { userEmail, testId, answers, mobile = [] } = req.body;
        const test = await TestRepo.findOne({
            where: { id: testId },
            relations: ['questions'],
        });
        if (!test) {
            return (0, createResponse_1.createResponse)(res, 404, 'Test not found', [], true, false);
        }
        const existing = await Submission_entity_1.Submission.findOne({ where: { userEmail, testId } });
        if (existing) {
            return (0, createResponse_1.createResponse)(res, 409, 'Test already submitted', [], false, true);
        }
        let score = 0;
        let correctAnswers = 0;
        let incorrectAnswers = 0;
        let unansweredAnswers = 0;
        const totalQuestions = test.questions.length;
        const answerDetails = [];
        test.questions.forEach((question, index) => {
            const selectedOption = answers[index]?.selectedOption;
            const correctOption = question.options.find((opt) => opt.isCorrect);
            if (selectedOption == null || selectedOption === undefined) {
                unansweredAnswers++;
            }
            else if (correctOption?.id === selectedOption) {
                correctAnswers++;
                score++;
            }
            else {
                incorrectAnswers++;
            }
            answerDetails.push({
                question: question.question,
                selectedOption,
                correctOption: correctOption?.id,
            });
        });
        const submission = Submission_entity_1.Submission.create({
            userEmail,
            testId,
            test,
            submitted: true,
            score,
            answers: answerDetails,
            correct: correctAnswers,
            incorrect: incorrectAnswers,
            unanswered: unansweredAnswers,
            totalQuestions,
            mobile,
        });
        const result = await submission.save();
        return (0, createResponse_1.createResponse)(res, 201, 'Test submitted successfully', result, false, true);
    }
    catch (error) {
        console.error(error);
        return (0, createResponse_1.createResponse)(res, 500, 'Submission failed', error, true, false);
    }
};
exports.submitTest = submitTest;
// ✅ Get all submissions with pagination
const getAllSubmissions = async (req, res) => {
    try {
        const { email, page = 1, limit = 10 } = req.query;
        const take = parseInt(limit, 10);
        const skip = (parseInt(page, 10) - 1) * take;
        const queryBuilder = Submission_entity_1.Submission.createQueryBuilder('submission')
            .leftJoinAndSelect('submission.test', 'test')
            .skip(skip)
            .take(take);
        if (email) {
            queryBuilder.where('submission.userEmail = :email', { email });
        }
        const [data, total] = await queryBuilder.getManyAndCount();
        return (0, createResponse_1.createResponse)(res, 200, 'Submissions fetched', {
            data,
            total,
            page: parseInt(page, 10),
            limit: take,
            totalPages: Math.ceil(total / take),
        }, false, true);
    }
    catch (error) {
        console.error(error);
        return (0, createResponse_1.createResponse)(res, 500, 'Error fetching submissions', error, true, false);
    }
};
exports.getAllSubmissions = getAllSubmissions;
