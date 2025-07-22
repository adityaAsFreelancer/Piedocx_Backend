import { Request, Response } from "express";
import { AppDataSource } from "../dbconfig/dbconfig";
import { StudentSignup } from "../Entities/StudentSignup.entity";
import { createResponse } from "../Helpers/createResponse";

const studentRepo = AppDataSource.getRepository(StudentSignup);

export const StudentRegister = async (req: Request, res: Response) => { 
  try {
    const studentInfo = req.body;
    const isExist = await studentRepo.findOne({ where: { email: studentInfo.email } });
    if (isExist) {
      return createResponse(res, 208, "User Already Exists!", isExist, false, true);
    }
    const newStudent = studentRepo.create(studentInfo);
    const result = await studentRepo.save(newStudent); 
    if (result) {
      return createResponse(res, 201, "User registered successfully!", result, true, false);
    } else {
      return createResponse(res, 400, "User registration failed!", null, false, true);
    }
  } catch (err) {
    return createResponse(res, 500, "Internal Server Error!", err, false, true);
  }
};
