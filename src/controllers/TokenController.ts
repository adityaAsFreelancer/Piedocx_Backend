import { AppDataSource } from "../dbconfig/dbconfig";
import { Tokentbl } from "../Entities/Token.entity";
import { createResponse } from "../Helpers/createResponse";
import jsonwebtoken from 'jsonwebtoken';

const TokenRepo = AppDataSource.getRepository(Tokentbl);

const TokenController = async (req: any, res: any) => {
    try {
        const { tokencode, expiretime } = req.body;

        if (!tokencode || !expiretime) {
            return createResponse(res, 400, "tokencode and expiretime are required", null, false, true);
        }

        // Create token entity without JWT for now
        const data = TokenRepo.create({ tokenName: tokencode, expiretime });
        const savedToken = await TokenRepo.save(data);

        // Generate JWT token
        const jwtToken = jsonwebtoken.sign(
            { id: savedToken?.id },
            `${process.env.JWTSECERETKEY}`,
            { expiresIn: expiretime } // "2h", "3600", etc.
        );

        // Update saved record with token
        savedToken.token = jwtToken;
        const finalSaved = await TokenRepo.save(savedToken);

        return createResponse(res, 201, "Token Created successfully!", finalSaved, true, false);

    } catch (err) {
        return createResponse(res, 500, "Internal Server Error!", err, false, true);
    }
};

export default TokenController;
