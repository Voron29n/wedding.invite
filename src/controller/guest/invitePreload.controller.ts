import { NextFunction, Request, Response, Router } from 'express';
import { Role } from '@types';
import { sendEntityDataResponse } from '@src/utils';
import { getInviteInfo } from '@src/service';
import { InviteGroupEntity } from '@entities';
import { getGuestByInviteId } from '@repository';
import { BadRequestError } from '@errors';
import { ERROR_MESSAGES } from '@const';

const invitePreload: Router = Router();

invitePreload.get(
  '/:inviteId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const guest = await getGuestByInviteId(req.params.inviteId);

      if (!guest) {
        throw new BadRequestError(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      const inviteGroup = await getInviteInfo(guest);

      sendEntityDataResponse<InviteGroupEntity>(res, inviteGroup, Role.guest);
    } catch (error) {
      next(error);
    }
  }
);

export { invitePreload };
