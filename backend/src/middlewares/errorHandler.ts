import express, { Request, Response, NextFunction } from 'express';
import {
    AppError,
    RequestError,
    AuthError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    RangeNotSatisfiableError,
    UnprocessableEntityError,
    ServerError,
} from '../errors/errors';

const errorHandler = (
    err: ServerError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // if the error is an instance of AppError, use its status code and message
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: err.statusCode,
        });
    }

    // if the error is not an instance of AppError, return a generic 500 error
    const statusCode = 'statusCode' in err ? (err as any).statusCode : 500;
    const message = (err as any).message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? 'Error on the server' : message,
        code: statusCode,
    });
};

// res.status(code).send({
//     message: code === 500 ? 'Error on the server' : message,
// });
// next(err);
// };

export default errorHandler;
