import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import BadRequestError from "../errors/badRequestError";

const validate = (schema: ZodSchema) =>{
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return next(new BadRequestError(error.errors));
            }
            next(error);
        }
    };
}

export default validate;