import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

interface CustomError extends Error {
    status?: number;
    errors?: any;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';
    let errors = err.errors || null;

    logger.error({
        status,
        message,
        errors
    });

    res.status(status).json({ 
        message, 
        errors 
    });

    next();
}

export default errorHandler;
