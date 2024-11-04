import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import BadRequestError from "../errors/badRequestError.js";

const validate = (paramsSchema?: ZodSchema, bodySchema?: ZodSchema) =>{
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (paramsSchema) {
                paramsSchema.safeParse(req.params);
            }
            if (bodySchema) {
                bodySchema.safeParse(req.body);
            }
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