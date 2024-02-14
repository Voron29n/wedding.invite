import { NextFunction, Request, Response } from 'express';

import { ErrorResponse } from '@types';
import { sendErrorResponse } from '@src/utils';

import { HTTPError } from './error.type';

const internalServerErrorMessage = (errorMessage: string): ErrorResponse => ({
  statusCode: 500,
  message: `Internal Server error: ${errorMessage}`
});

export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) =>
  sendErrorResponse(
    res,
    err instanceof HTTPError
      ? err
      : internalServerErrorMessage(err.message || (err as any).error?.message)
  );
