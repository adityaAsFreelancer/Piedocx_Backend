import path from "path";
import { createResponse } from "../Helpers/createResponse";
import { uploadFileHelper } from "../Helpers/UploadFilehelper";
import { AppDataSource } from "../dbconfig/dbconfig";
import { Programming } from "../Entities/Programming.entity";

const ProgrammingRepo = AppDataSource.getRepository(Programming);

const ProgrammingController = async (req: any, res: any) => {
  try {
    const { title } = req.body; // ✅ correctly extract only 'title'
    const image = req?.files?.image;

    if (!title) {
      return createResponse(res, 400, "Title is required", [], false, true);
    }

    if (!image) {
      return createResponse(res, 400, "Image file is required", [], false, true);
    }

    const pathToSaveFile = path.join(__dirname, "../Image/");
    const savedFileName = await uploadFileHelper(image, pathToSaveFile, res);
    if (!savedFileName) return;

    const newProgramming = ProgrammingRepo.create({
      image: savedFileName,
      title: title, 
    });

    const result = await ProgrammingRepo.save(newProgramming);
    return createResponse(res, 201, "Programming added successfully", result, true, false);
  } catch (err) {
    return createResponse(res, 500, "Internal Server Error!", err, false, true);
  }
};

export default ProgrammingController;
