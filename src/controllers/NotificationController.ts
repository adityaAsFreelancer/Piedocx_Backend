import { AppDataSource } from "../dbconfig/dbconfig"
import { Notification } from "../Entities/Notification.entity"
import { createResponse } from "../Helpers/createResponse";

const NotificationRepo = AppDataSource.getRepository(Notification)
const NotificationController = async (req: any, res: any) => {
    try {
        const { title, description } = req?.body;
        const notify = NotificationRepo.create({ title, description })
        const result = await NotificationRepo.save(notify)
        if (result) {
            return createResponse(res, 201, "Notification Added successfully!", result, true, false);
        }
        else {
            return createResponse(res, 400, "Notification failed! not added", null, false, true);
        }
    } catch (err) {
        return createResponse(res, 500, "Internal Server Error!", err, false, true);
    }

}
export const getNotification = async (req: any, res: any) => {
    try {
        const result = await NotificationRepo.find()
        if (result) {
            return createResponse(res, 201, "Notification fetcheds successfully!", result, true, false);
        }
        else {
            return createResponse(res, 400, "Notification failed! not added", null, false, true);
        }
    } catch (err) {
        return createResponse(res, 500, "Internal Server Error!", err, false, true);
    }
}

export default NotificationController