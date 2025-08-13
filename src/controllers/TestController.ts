import { Request, Response } from 'express';
import { Test } from '../Entities/Test.entity';
import { Submission } from '../Entities/Submission.entity';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateTestDTO } from '../dto/CreateTest.dto';
import { createResponse } from '../Helpers/createResponse';
import { AppDataSource } from '../dbconfig/dbconfig';

const TestRepo = AppDataSource.getRepository(Test);

// ✅ Create a new test
export const createTest = async (req: Request, res: Response) => {
  try {
    const dto :any= plainToInstance(CreateTestDTO, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return createResponse(
        res,
        400,
        'Validation failed',
        errors.map((err) => err.constraints),
        true,
        false
      );
    }

    const { title, questions, marks, time } = dto;
    const test = TestRepo.create({ title, question:questions, marks, time });
    await TestRepo.save(test);

    return createResponse(res, 201, 'Test created successfully', test, false, true);
  } catch (error) {
    console.error(error);
    return createResponse(res, 500, 'Error creating test', error, true, false);
  }
};

// ✅ Get all tests
export const getAllTests = async (_req: Request, res: Response) => {
  try {
    const tests = await TestRepo.find();
    return createResponse(res, 200, 'All tests fetched', tests, false, true);
  } catch (error) {
    return createResponse(res, 500, 'Error fetching tests', error, true, false);
  }
};

// ✅ Submit a test
export const submitTest = async (req: Request, res: Response) => {
  try {
    const { userEmail,userName, testId, answers,mobile = [] } = req.body;

    const test = await TestRepo.findOne({
      where: { id: testId },
      relations: ['questions'],
    });

    if (!test) {
      return createResponse(res, 404, 'Test not found', [], true, false);
    }

    const existing = await Submission.findOne({ where: { userEmail, testId } });
    if (existing) {
      return createResponse(res, 409, 'Test already submitted', [], false, true);
    }

    let score = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unansweredAnswers = 0;
    const totalQuestions = test.questions.length;

    const answerDetails: {
      question: string;
      selectedOption: number;
      correctOption: number | undefined;
    }[] = [];

    test.questions.forEach((question, index) => {
      const selectedOption = answers[index]?.selectedOption;
      const correctOption = question.options.find((opt) => opt.isCorrect);

      if (selectedOption == null || selectedOption === undefined) {
        unansweredAnswers++;
      } else if (correctOption?.id === selectedOption) {
        correctAnswers++;
        score++;
      } else {
        incorrectAnswers++;
      }

      answerDetails.push({
        question: question.question,
        selectedOption,
        correctOption: correctOption?.id,
      });
    });

    const submission = Submission.create({
      userEmail,
      testId,
      test,
      submitted: true,
      score,
      name:userName,
      answers: answerDetails,
      correct: correctAnswers,
      incorrect: incorrectAnswers,
      unanswered: unansweredAnswers,
      totalQuestions,
      mobile,
    });

    const result = await submission.save();

    return createResponse(res, 201, 'Test submitted successfully', result, false, true);
  } catch (error) {
    console.error(error);
    return createResponse(res, 500, 'Submission failed', error, true, false);
  }
};
export const getAllSubmissionsByEmail = async (req: Request, res: Response) => {
  try {
    const { email, page = 1, limit = 10 } = req.query;

    const take = parseInt(limit as string, 10);
    const skip = (parseInt(page as string, 10) - 1) * take;

    const queryBuilder = Submission.createQueryBuilder('submission')
      .leftJoinAndSelect('submission.test', 'test')
      .skip(skip)
      .take(take);

    if (email) {
      queryBuilder.where('submission.userEmail = :email', { email });
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return createResponse(
      res,
      200,
      'Submissions fetched',
      {
        data,
        total,
        page: parseInt(page as string, 10),
        limit: take,
        totalPages: Math.ceil(total / take),
      },
      false,
      true
    );
  } catch (error) {
    console.error(error);
    return createResponse(res, 500, 'Error fetching submissions', error, true, false);
  }
};
export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await Submission.find({
      order: {
        createdAt: 'DESC',
      },
    });

    // Return plain array directly in 'data'
    return createResponse(
      res,
      200,
      'All submissions fetched successfully',
      submissions, // ✅ This is the array directly
      false,
      true
    );
  } catch (error) {
    console.error(error);
    return createResponse(res, 500, 'Error fetching all submissions', error, true, false);
  }
};
