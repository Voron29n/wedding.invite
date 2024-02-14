import { NextFunction, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { ERROR_MESSAGES } from '@const';
import { ForbiddenError } from '@errors';
import { getAdminByToken, getGuestByToken, validateToken } from '@service';
import { AuthValidatedRequest, Role, TokenPayload } from '@types';
import {
  AuthorizationRequestSchema,
  CreateGuestRequestSchema,
  UserRequestSchema
} from '@validation';

import { getToken } from './utils';

const authMiddleware = async (
  req: ValidatedRequest<AuthorizationRequestSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const authRequest = req as AuthValidatedRequest<CreateGuestRequestSchema>;
    const token: string = getToken(req, next);
    const { id, role }: TokenPayload = validateToken(token);

    if (role === Role.guest) {
      authRequest.guest = await getGuestByToken(id);
    } else if (role === Role.admin) {
      authRequest.admin = await getAdminByToken(id);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const accessByRole =
  (accessRoles: string[] | string) =>
  (
    req: ValidatedRequest<UserRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    const authRequest = req as AuthValidatedRequest<CreateGuestRequestSchema>;
    const role: string = authRequest.admin?.role || authRequest.guest?.role;

    if (
      (Array.isArray(accessRoles) && accessRoles.includes(role)) ||
      accessRoles === role
    ) {
      next();
    } else {
      next(new ForbiddenError(ERROR_MESSAGES.ACCESS_DENIED));
    }
  };

const isAdmin = (
  req: ValidatedRequest<UserRequestSchema>,
  res: Response,
  next: NextFunction
) => accessByRole(Role.admin).call(null, req, res, next);

const isGuest = (
  req: ValidatedRequest<UserRequestSchema>,
  res: Response,
  next: NextFunction
) => accessByRole(Role.guest).call(null, req, res, next);
export { authMiddleware, isAdmin, isGuest };
