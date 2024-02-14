import { NextFunction, Response, Router } from 'express';
import {
  createValidator,
  ExpressJoiInstance,
  ValidatedRequest
} from 'express-joi-validation';

import { createAdmin } from '@service';
import { CreateAdminRequestBody, UserType } from '@types';
import { sendDataResponse } from '@src/utils';
import { createAdminBodySchema, CreateAdminRequestSchema } from '@validation';

const adminRouter: Router = Router();
const validator: ExpressJoiInstance = createValidator({ passError: true });

adminRouter.post(
  '/register',
  validator.body(createAdminBodySchema),
  async (
    req: ValidatedRequest<CreateAdminRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: CreateAdminRequestBody = req.body;
      const createdAdmin: UserType = await createAdmin(user);

      sendDataResponse<UserType>(res, createdAdmin);
    } catch (error) {
      next(error);
    }
  }
);

export { adminRouter };
