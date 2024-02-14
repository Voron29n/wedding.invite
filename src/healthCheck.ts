import { NextFunction, Request, Response, Router } from 'express';

import { InternalServerError } from '@errors';
import { HealthCheckData } from '@types';
import { sendDataResponse } from './utils';

import { DI } from './index';

const healthCheckRouter: Router = Router();

healthCheckRouter.get(
  '/db',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isConnected: boolean = await DI.orm.isConnected();

      if (isConnected) {
        sendDataResponse<HealthCheckData>(res, { status: 'up' });
      } else {
        next(new InternalServerError('database is not connected'));
      }
    } catch (error) {
      next(new InternalServerError());
    }
  }
);

export { healthCheckRouter };
