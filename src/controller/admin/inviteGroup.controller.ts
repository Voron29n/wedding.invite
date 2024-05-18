import { NextFunction, Request, Response, Router } from 'express';
import {
  createValidator,
  ExpressJoiInstance,
  ValidatedRequest
} from 'express-joi-validation';
import { InviteGroupEntity } from '@entities';
import {
  createInviteGroup,
  editInviteGroup,
  getInviteGroup,
  getInviteGroups,
  removeInviteGroup
} from '@service';
import {
  AuthValidatedRequest,
  CreateInviteGroupRequestBody,
  EditInviteGroupRequestBody,
  RemoveResponseData
} from '@types';
import { sendEntityDataResponse } from '@src/utils';
import {
  createInviteGroupBodySchema,
  CreateInviteGroupRequestSchema,
  editInviteGroupBodySchema,
  EditInviteGroupRequestSchema
} from '@validation';

const inviteGroup: Router = Router();
const validator: ExpressJoiInstance = createValidator({ passError: true });

inviteGroup.post(
  '/',
  validator.body(createInviteGroupBodySchema),
  async (
    req: ValidatedRequest<CreateInviteGroupRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inviteGroupBody: CreateInviteGroupRequestBody = req.body;
      const { admin } =
        req as AuthValidatedRequest<CreateInviteGroupRequestSchema>;
      const inviteGroup = await createInviteGroup(inviteGroupBody, admin);

      sendEntityDataResponse<InviteGroupEntity>(res, inviteGroup);
    } catch (error) {
      next(error);
    }
  }
);

inviteGroup.put(
  '/',
  validator.body(editInviteGroupBodySchema),
  async (
    req: ValidatedRequest<EditInviteGroupRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inviteGroupBody: EditInviteGroupRequestBody = req.body;
      const { admin } =
        req as AuthValidatedRequest<CreateInviteGroupRequestSchema>;
      const inviteGroup = await editInviteGroup(inviteGroupBody, admin);

      sendEntityDataResponse<InviteGroupEntity>(res, inviteGroup);
    } catch (error) {
      next(error);
    }
  }
);

inviteGroup.get(
  '/:groupId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId: string = req.params?.groupId || '';
      const inviteGroup = await getInviteGroup(groupId);

      sendEntityDataResponse<InviteGroupEntity>(res, inviteGroup);
    } catch (error) {
      next(error);
    }
  }
);

inviteGroup.delete(
  '/:groupId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId: string = req.params?.groupId || '';
      const removeResponseData = await removeInviteGroup(groupId);

      sendEntityDataResponse<RemoveResponseData>(res, removeResponseData);
    } catch (error) {
      next(error);
    }
  }
);

inviteGroup.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inviteGroups = await getInviteGroups();

      sendEntityDataResponse<InviteGroupEntity[]>(res, inviteGroups);
    } catch (error) {
      next(error);
    }
  }
);

export { inviteGroup };
