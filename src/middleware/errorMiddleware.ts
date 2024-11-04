import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

interface CustomError extends Error {
    status?: number;
    errors?: any;
    code?: number;  // For MongoDB duplicate key errors
    value?: any;
    path?: string;
    reason?: string;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';
    let errors = err.errors || null;

    if (err.name === 'ValidationError') {
        status = 400;
        message = 'Validation Error';
        errors = Object.values(err.errors || {}).map((error: any) => ({
            field: error.path,
            message: error.message
        }));
    }

    // Handle Mongoose Cast Errors
    if (err.name === 'CastError') {
        status = 400;
        message = 'Invalid ID format';
        errors = {
            value: err.value,
            path: err.path,
            reason: err.reason
        };
    }

    // Handle MongoDB Duplicate Key Errors
    if (err.code === 11000) {
        status = 409;
        message = 'Duplicate key error';
    }


    logger.error({
        status,
        message,
        errors
    });

    res.removeHeader('Content-Type');
    res.setHeader('Content-Type', 'application/json');
    res.status(status).json({ 
        message, 
        errors 
    });
}

export default errorHandler;
