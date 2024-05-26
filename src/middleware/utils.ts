import { NextFunction } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { AUTH, ERROR_MESSAGES } from '@const';
import { ForbiddenError } from '@errors';
import { AuthorizationRequestSchema } from '@validation';

export const getToken = (
  req: ValidatedRequest<AuthorizationRequestSchema>,
  next: NextFunction
): string => {
  if (!req.headers?.[AUTH.AUTHORIZATION_HEADER]) {
    throw new ForbiddenError(ERROR_MESSAGES.MUST_AUTHORIZED_USER);
  }

  const [tokenType, token] = req.headers[AUTH.AUTHORIZATION_HEADER]?.split(' ');

  if (tokenType !== AUTH.BEARER) {
    next(new ForbiddenError(ERROR_MESSAGES.INVALID_TOKEN));
  }

  return token;
};
