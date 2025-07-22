import { AppDataSource } from "../dbconfig/dbconfig";
import { StudentSignup } from "../Entities/StudentSignup.entity";
import { createResponse } from "../Helpers/createResponse";
import bcrypt from "bcryptjs";

const studentRepo = AppDataSource.getRepository(StudentSignup);

const ChangePasswordController = async (req: any, res: any) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { userid } = req.query;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return createResponse(res, 400, "All fields are required", null, false, true);
    }
    if (newPassword !== confirmPassword) {
      return createResponse(res, 400, "New password and repeat password must match", null, false, true);
    }
    const user = await studentRepo.findOne({ where: { id: userid } });
    if (!user) {
      return createResponse(res, 404, "User not found", null, false, true);
    }
    if(user.password!==oldPassword){
      return createResponse(res, 404, "oldPassword is not match", null, false, true);
    }
    user.password = newPassword;
    // Save updated password
    await studentRepo.save(user);
    return createResponse(res, 200, "Password changed successfully", null, true, false);
  } catch (err) {
    return createResponse(res, 500, "Internal Server Error!", err, false, true);
  }
};
export default ChangePasswordController;
