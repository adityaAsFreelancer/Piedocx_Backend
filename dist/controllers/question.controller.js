"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionsByTest = exports.addQuestionToTest = void 0;
const Question_entity_1 = require("../Entities/Question.entity");
const CreateQuestionDTO_1 = require("../dto/CreateQuestionDTO");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const addQuestionToTest = async (req, res) => {
    const dto = (0, class_transformer_1.plainToInstance)(CreateQuestionDTO_1.CreateQuestionDTO, req.body);
    const errors = await (0, class_validator_1.validate)(dto);
    if (errors.length > 0)
        return res.status(400).json(errors);
    try {
        const question = Question_entity_1.Question.create(dto);
        await question.save();
        return res.status(201).json({ message: 'Question added successfully', question });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', error: err });
    }
};
exports.addQuestionToTest = addQuestionToTest;
const getQuestionsByTest = async (req, res) => {
    try {
        const { testId } = req.params;
        const result = await Question_entity_1.Question.find({
            where: { test_id: testId }
        });
        if (!result)
            return res.status(404).json({ message: 'Test not found' });
        return res.status(200).json({ questions: result });
    }
    catch (err) {
        console.error('Fetch error:', err);
        return res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.getQuestionsByTest = getQuestionsByTest;
