import path from "path";
import { uploadFileHelper } from "../Helpers/UploadFilehelper";
import { AppDataSource } from "../dbconfig/dbconfig";
import { Clienttbl } from "../Entities/Clients.entity";
import { createResponse } from "../Helpers/createResponse";

const ClientRepo = AppDataSource.getRepository(Clienttbl);

const ClientController = async (req: any, res: any) => {
  try {
    // 💡 Safely access the image field
    const imageFile = req.files?.image;
    if (!imageFile) {
      return createResponse(res, 400, "Image file is required", [], false, true);
    }

    const pathToSaveFile = path.join(__dirname, "../Image/");

    const savedFileName = await uploadFileHelper(imageFile, pathToSaveFile, res);
    if (!savedFileName) return; 

    const newClient = ClientRepo.create({
      image: savedFileName,
    });

    const finalData = await ClientRepo.save(newClient);
    return createResponse(res, 201, "Client image uploaded successfully", finalData, true, false);
  } catch (error) {
    console.error("Upload error:", error);
    return createResponse(res, 500, "Internal Server Error", [], false, true);
  }
};

export default ClientController;
