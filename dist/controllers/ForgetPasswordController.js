"use strict";
// import { AppDataSource } from "../dbconfig/dbconfig";
// import { StudentSignup } from "../Entities/StudentSignup.entity";
// import { createResponse } from "../Helpers/createResponse";
// import { createRandomString, sendForgetPasswordMail } from "./otpController";
// const studentRepo = AppDataSource.getRepository(StudentSignup);
// export const ForgetPassswordController = async (req: any, res: any) => {
//     const { email} = req.body;
//     const isExist = await studentRepo.findOne({ where: { email } })
//     if (isExist) {
//         await studentRepo.update({ email: email })
//         await sendForgetPasswordMail(email)
//         return createResponse(res, 200, "Mail send Successfull !", [], true, false);
//     } else {
//         return createResponse(res, 404, "User Not Found!", [], false, true);
//     }
// }
