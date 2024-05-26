import { NextFunction, Request, Response, Router } from 'express';
import {
  createValidator,
  ExpressJoiInstance,
  ValidatedRequest
} from 'express-joi-validation';
import { Role, SurveyResponsesBodyType } from '@types';
import { sendEntityDataResponse } from '@utils';
import { getInviteInfo, saveInviteInfoSurveyResponse } from '@service';
import { InviteGroupEntity } from '@entities';
import {
  surveyResponseBodySchema,
  SurveyResponseRequestSchema
} from '@validation';
import { getGuestByInviteId } from '@repository';
import { BadRequestError } from '@errors';
import { ERROR_MESSAGES } from '@const';

const inviteInfo: Router = Router();
const validator: ExpressJoiInstance = createValidator({ passError: true });

inviteInfo.get(
  '/:inviteId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const guest = await getGuestByInviteId(req.params.inviteId);

      if (!guest) {
        throw new BadRequestError(ERROR_MESSAGES.INVALID_INVITE_ID);
      }

      const inviteGroup = await getInviteInfo(guest);

      sendEntityDataResponse<InviteGroupEntity>(res, inviteGroup, Role.guest);
    } catch (error) {
      next(error);
    }
  }
);

inviteInfo.post(
  '/surveyResponse',
  validator.body(surveyResponseBodySchema),
  async (
    req: ValidatedRequest<SurveyResponseRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body: SurveyResponsesBodyType = req.body;
      const guest = await getGuestByInviteId(body.inviteId);

      if (!guest) {
        throw new BadRequestError(ERROR_MESSAGES.INVALID_INVITE_ID);
      }

      const inviteGroup = await saveInviteInfoSurveyResponse(guest, body);

      sendEntityDataResponse<InviteGroupEntity>(res, inviteGroup, Role.guest);
    } catch (error) {
      next(error);
    }
  }
);

export { inviteInfo };
