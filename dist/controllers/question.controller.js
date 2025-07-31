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
exports.getQuestionsByTest = exports.addQuestionToTest = void 0;
const Question_entity_1 = require("../Entities/Question.entity");
const CreateQuestionDTO_1 = require("../dto/CreateQuestionDTO");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Test_entity_1 = require("../Entities/Test.entity");
const addQuestionToTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = (0, class_transformer_1.plainToInstance)(CreateQuestionDTO_1.CreateQuestionDTO, req.body);
    const errors = yield (0, class_validator_1.validate)(dto);
    if (errors.length > 0)
        return res.status(400).json(errors);
    try {
        const question = Question_entity_1.Question.create(dto);
        yield question.save();
        return res.status(201).json({ message: 'Question added successfully', question });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});
exports.addQuestionToTest = addQuestionToTest;
const getQuestionsByTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { testId } = req.params;
        const test = yield Test_entity_1.Test.findOne({
            where: { id: testId },
            relations: ['questions'],
        });
        if (!test)
            return res.status(404).json({ message: 'Test not found' });
        return res.status(200).json({ questions: test.questions });
    }
    catch (err) {
        console.error('Fetch error:', err);
        return res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getQuestionsByTest = getQuestionsByTest;
