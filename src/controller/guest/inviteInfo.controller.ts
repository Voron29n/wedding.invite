import { NextFunction, Request, Response, Router } from 'express';
import { ValidatedRequestSchema } from 'express-joi-validation';
import { AuthValidatedRequest, Role } from '@types';
import { sendEntityDataResponse } from '@src/utils';
import { getInviteInfo } from '@src/service/inviteInfo.service';
import { InviteGroupEntity } from '@entities';

const inviteInfo: Router = Router();

inviteInfo.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { guest } = req as AuthValidatedRequest<ValidatedRequestSchema>;
    const inviteGroup = await getInviteInfo(guest);

    sendEntityDataResponse<InviteGroupEntity>(res, inviteGroup, Role.guest);
  } catch (error) {
    next(error);
  }
});

export { inviteInfo };
