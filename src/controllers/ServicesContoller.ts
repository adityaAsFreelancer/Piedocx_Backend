import { AppDataSource } from "../dbconfig/dbconfig";
import { Services } from "../Entities/Services.entity";
import { createResponse } from "../Helpers/createResponse";

const ServicesRepo = AppDataSource.getRepository(Services)
const ServicesController =async (req: any, res: any) => {
    try {
        const title=req?.body;
        const result=ServicesRepo.create(title)
        const finalresult=await ServicesRepo.save(result)
        if(finalresult){
            return createResponse(res, 201, "Services Added successfully!", finalresult, true, false);
        }
        else{
            return createResponse(res, 400, "Services failed! not added", null, false, true);
        }
    } catch (err) {
        return createResponse(res, 500, "Internal Server Error!", err, false, true);
    }
}
export default ServicesController;