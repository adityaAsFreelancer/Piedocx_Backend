import { AppDataSource } from "../dbconfig/dbconfig";
import { EnrollMent } from "../Entities/StudentEnrollment.entity";
import { createResponse } from "../Helpers/createResponse";
const StudentEnrollMent = AppDataSource.getRepository(EnrollMent);

export const EnrollMentController = async (req: any, res: any) => {
    try {
        const StudentEnroll = req?.body;
        const newStudentEnrollMent = StudentEnrollMent.create(StudentEnroll)
        const result = await StudentEnrollMent.save(newStudentEnrollMent)
        if (result) {
            return createResponse(res, 201, "EnrollMent successfully!", result, true, false);
        } else {
            return createResponse(res, 400, "EnrollMent failed!", null, false, true);
        }
    } catch (err) {
        return createResponse(res, 500, "Internal Server Error!", err, false, true);
    }
}