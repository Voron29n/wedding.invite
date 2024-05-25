import { NextFunction, Request, Response, Router } from 'express';
import {
  createValidator,
  ExpressJoiInstance,
  ValidatedRequest,
  ValidatedRequestSchema
} from 'express-joi-validation';
import { AuthValidatedRequest, Role } from '@types';
import { sendEntityDataResponse } from '@src/utils';
import { getInviteInfo, saveInviteInfoSurveyResponse } from '@src/service';
import { InviteGroupEntity } from '@entities';
import {
  surveyResponseBodySchema,
  SurveyResponseRequestSchema
} from '@src/validation/surveyResponses.validation';
import { SurveyResponsesBodyType } from '@src/types/surveyResponses.type';

const inviteInfo: Router = Router();
const validator: ExpressJoiInstance = createValidator({ passError: true });

inviteInfo.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { guest } = req as AuthValidatedRequest<ValidatedRequestSchema>;
    const inviteGroup = await getInviteInfo(guest);

    sendEntityDataResponse<InviteGroupEntity>(res, inviteGroup, Role.guest);
  } catch (error) {
    next(error);
  }
});

inviteInfo.post(
  '/surveyResponse',
  validator.body(surveyResponseBodySchema),
  async (
    req: ValidatedRequest<SurveyResponseRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { guest } = req as AuthValidatedRequest<ValidatedRequestSchema>;
      const body: SurveyResponsesBodyType = req.body;
      const inviteGroup = await saveInviteInfoSurveyResponse(guest, body);

      sendEntityDataResponse<InviteGroupEntity>(res, inviteGroup, Role.guest);
    } catch (error) {
      next(error);
    }
  }
);

export { inviteInfo };
