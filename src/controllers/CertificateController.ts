import { Request, Response } from "express";
import { AppDataSource } from "../dbconfig/dbconfig";
import { CertificateTbl } from "../Entities/Certificate.entity";
import { createResponse } from "../Helpers/createResponse";

const CertificateController = async (req: Request, res: Response) => {
  try {
    const {
      tokenid,
      studentname,
      college,
      whatsappNumber,
      email,
      feedback,
      course
    } = req.body;

    if (!tokenid || !studentname || !college || !email ||!feedback || !course) {
      return createResponse(res, 400, "All required fields must be provided", null, false, true);
    }

    const cert = CertificateTbl.create({
      tokenid,
      studentname,
      college,
      whatsappNumber,
      email,
      feedback,
      course,
    });

    const saved = await CertificateTbl.save(cert);

    return createResponse(res, 201, "Certificate added successfully", saved, true, false);

  } catch (err) {
    return createResponse(res, 500, "Internal Server Error!", err, false, true);
  }
};


 export const getCertificate=async(req:any,res:any)=>{
  try {
    const {tokenid,email}=req?.body;
    const result =await CertificateTbl.findOne({where:{tokenid,email}})
    if(result){
       return createResponse(res, 201, "Certificate Fetched Successfullys", result, true, false);
    }
    else{
       return createResponse(res, 404, "Invalid toknid or email", [], false, true)
    }
  } catch (err) {
    
  }
}

export default CertificateController;
