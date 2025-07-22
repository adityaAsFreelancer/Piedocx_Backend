import { AppDataSource } from "../dbconfig/dbconfig";
import { AdminTbl } from "../Entities/Admin.entity";
import { createResponse } from "../Helpers/createResponse";
import jsonwebtoken from 'jsonwebtoken'
const AdminRepo = AppDataSource.getRepository(AdminTbl);
export const AdminController = async (req: any, res: any) => {
    try {
        const { email, password } = req?.body;
        const result = await AdminRepo.findOne({ where: { email, password } })
        const token=await jsonwebtoken.sign({id:result?.id,email:result?.email},`${process.env.JWTSECERETKEY}`,{expiresIn:"2h"})
        const finalresult={...result,token}
        if (result) {
            return createResponse(res, 200, "Admin Login success", finalresult, true, false)
        }
        else {
            return createResponse(res, 404, "Invalid email or Passwordss!", [], false, true)
        }

    } catch (err) {
        return createResponse(res, 500, "Internal Server Error!", err, false, true);
    }
}