import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../dbconfig/dbconfig";
import { Tokentbl } from "../Entities/Token.entity";
import jwt from "jsonwebtoken";

const TokenRepo = AppDataSource.getRepository(Tokentbl);

const CheckTokenMiddleware = async (req: any , res: any, next: NextFunction) => {
  try {
    // Token from header (preferred)
    const headerToken = req.headers.authorization?.split(" ")[1];
    const bodyToken = req.body.tokencode;

    const token = headerToken || bodyToken;

    if (!token) {
      return res.status(400).json({
        code: 400,
        message: "Token is required (in header or body)",
        success: false,
        error: true,
        data: null,
      });
    }

    // Verify JWT signature & expiry
    try {
      jwt.verify(token, `${process.env.JWTSECERETKEY}`);
    } catch (err: any) {
      return res.status(401).json({
        code: 401,
        message: err.name === "TokenExpiredError" ? "JWT token expired" : "JWT token invalid",
        success: false,
        error: true,
        data: null,
      });
    }

    // Verify in DB (manual expiry check)
    const tokenData = await TokenRepo.findOne({ where: { token: token } });

    if (!tokenData) {
      return res.status(404).json({
        code: 404,
        message: "Token not found in database",
        success: false,
        error: true,
        data: null,
      });
    }

    const now = new Date();
    const expire = new Date(tokenData.expiretime);

    if (now > expire) {
      return res.status(401).json({
        code: 401,
        message: "Token expired (based on DB expiry time)",
        success: false,
        error: true,
        data: null,
      });
    }

    // Pass control to next middleware or controller
    next();
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      success: false,
      error: true,
      data: error,
    });
  }
};

export default CheckTokenMiddleware;
