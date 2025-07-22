import { AppDataSource } from "../dbconfig/dbconfig";
import { StudentSignup } from "../Entities/StudentSignup.entity";
import { createResponse } from "../Helpers/createResponse";
import jsonwebtoken from 'jsonwebtoken'

const studentRepo = AppDataSource.getRepository(StudentSignup);
export const StudentSigninController=async (req:any,res:any)=>{
    try {
        const {email,password}=req.body;
        const isLogin=await studentRepo.findOne({where:{email:email,password:password}})
        const token=await jsonwebtoken.sign({id:isLogin?.id,email:isLogin?.email},`${process.env.JWTSECERETKEY}`,{expiresIn:"2h"})
        const finalresult={...isLogin,token}
        if (isLogin) {
           return createResponse(res, 200, "Login success", finalresult, true, false)
        }
        else{
            return createResponse(res, 404, "Invalid email or Password!", [], false, true)
        }
    } catch (err) {
           return createResponse(res, 500, "Internal Server Error!", err, false, true); 
    }
}