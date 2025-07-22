import { Request, Response } from "express";
import { AppDataSource } from "../dbconfig/dbconfig";
import { CertificateTbl } from "../Entities/Certificate.entity";
import { createResponse } from "../Helpers/createResponse";

export const CertificateWithTokenController = async (req: any, res: any) => {
  try {
    const certWithToken = await AppDataSource
      .getRepository(CertificateTbl)
      .createQueryBuilder("certificate")
      .leftJoinAndSelect("Token", "token", "certificate.tokenid = token.id")
      .select([
        "certificate.id",
        "certificate.studentname",
        "certificate.college",
        "certificate.email",
        "certificate.course",
        "certificate.feedack",
        "token.token",
        "token.expiretime"
      ])
      .getRawMany();

    return createResponse(res, 200, "Certificates fetched successfully", certWithToken, true, false);
  } catch (err) {
    return createResponse(res, 500, "Internal server error", err, false, true);
  }
};
