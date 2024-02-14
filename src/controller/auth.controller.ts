import { NextFunction, Response, Router } from 'express';
import {
  createValidator,
  ExpressJoiInstance,
  ValidatedRequest
} from 'express-joi-validation';

import { loginAdmin, loginGuest } from '@service';
import {
  LoginAdminRequestBody,
  LoginGuestRequestBody,
  LoginTokenData
} from '@types';
import { sendDataResponse } from '@src/utils';
import {
  loginAdminBodySchema,
  LoginAdminRequestSchema,
  loginGuestBodySchema,
  LoginGuestRequestSchema
} from '@validation';

const authRouter: Router = Router();
const validator: ExpressJoiInstance = createValidator({ passError: true });

authRouter.post(
  '/login/admin',
  validator.body(loginAdminBodySchema),
  async (
    req: ValidatedRequest<LoginAdminRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: LoginAdminRequestBody = req.body;
      const loginTokenData: LoginTokenData = await loginAdmin(user);

      sendDataResponse<LoginTokenData>(res, loginTokenData);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  '/login/guest',
  validator.body(loginGuestBodySchema),
  async (
    req: ValidatedRequest<LoginGuestRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const guest: LoginGuestRequestBody = req.body;
      const loginTokenData: LoginTokenData = await loginGuest(guest);

      sendDataResponse<LoginTokenData>(res, loginTokenData);
    } catch (error) {
      next(error);
    }
  }
);

export { authRouter };
