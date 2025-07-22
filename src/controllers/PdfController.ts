import { AppDataSource } from "../dbconfig/dbconfig";
import { Pdftbl } from "../Entities/Pdf.entity";
import { uploadFileHelper } from "../Helpers/UploadFilehelper";
import { createResponse } from "../Helpers/createResponse";
import path from "path";

const pdfRepo = AppDataSource.getRepository(Pdftbl);

export const UploadPdf = async (req: any, res: any) => {
  try {
    const { title, size, url } = req.body;
    const thumbnail = req.files?.thumbnail;

    if (!title || !url) {
      return createResponse(res, 400, "Title and URL are required", [], false, true);
    }
    if (!thumbnail) {
      return createResponse(res, 400, "Image file is required", [], false, true);
    }
    const thumbnailPath = path.join(__dirname, "../PDF/");
    const savedFileName = await uploadFileHelper(thumbnail, thumbnailPath, res);
    const newPdf = pdfRepo.create({
      title,
      size,
      url,
      thumbnail: savedFileName,
    });

    const savedPdf = await pdfRepo.save(newPdf);

    return createResponse(res, 201, "PDF uploaded successfully", savedPdf, true, false);
  } catch (error) {
    console.error("Upload Error:", error);
    return createResponse(res, 500, "Internal server error", [], false, true);
  }
};

export const getAllPdfs = async (req: any, res: any) => {
  try {
    const pdfs = await pdfRepo.find({
      order: { createdAt: "DESC" },
    });

    return createResponse(res, 200, "PDFs fetched successfully", pdfs, true, false);
  } catch (error) {
    console.error("Fetch Error:", error);
    return createResponse(res, 500, "Internal server error", [], false, true);
  }
};
