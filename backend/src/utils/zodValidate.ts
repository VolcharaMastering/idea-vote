import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { RequestError } from '../errors/errors';

export const zodValidate =
    (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            next(
                new RequestError(
                    `Validation error ${result.error.issues.map(
                        (error) => error.message,
                    )}`,
                ),
            );
            return;
        }
        next();
    };
