import { Question } from '../Entities/Question.entity';
import { CreateQuestionDTO } from '../dto/CreateQuestionDTO';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Test } from '../Entities/Test.entity';

export const addQuestionToTest = async (req: any, res: any) => {
  const dto:any= plainToInstance(CreateQuestionDTO, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) return res.status(400).json(errors);
  try {
    const question:any = Question.create(dto);
    await question.save();
    return res.status(201).json({ message: 'Question added successfully', question });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', error: err });
  }
};

export const getQuestionsByTest = async (req: any, res: any) => {
  try {
    const { testId } = req.params;
    const result = await Question.find({
      where: { test_id: testId }
    });

    if (!result) return res.status(404).json({ message: 'Test not found' });

    return res.status(200).json({ questions: result});
  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};
export const deleteQuestion = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const question = await Question.findOne({ where: { id } });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await Question.remove(question);

    return res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

