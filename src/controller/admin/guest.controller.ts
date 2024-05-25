import { NextFunction, Request, Response, Router } from 'express';
import {
  createValidator,
  ExpressJoiInstance,
  ValidatedRequest
} from 'express-joi-validation';
import { GuestEntity } from '@entities';
import {
  createGuest,
  editGuest,
  getAllGuests,
  getGuest,
  removeGuest
} from '@service';
import {
  AuthValidatedRequest,
  CreateGuestRequestBody,
  EditGuestRequestBody,
  RemoveResponseData
} from '@types';
import { sendDataResponse, sendEntityDataResponse } from '@src/utils';
import {
  createGuestBodySchema,
  CreateGuestRequestSchema,
  editGuestBodySchema,
  EditGuestRequestSchema
} from '@validation';

const guestRouter: Router = Router();
const validator: ExpressJoiInstance = createValidator({ passError: true });

guestRouter.post(
  '/',
  validator.body(createGuestBodySchema),
  async (
    req: ValidatedRequest<CreateGuestRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { admin } = req as AuthValidatedRequest<CreateGuestRequestSchema>;
      const guest: CreateGuestRequestBody = req.body;
      const createdGuest = await createGuest(guest, admin);

      sendEntityDataResponse<GuestEntity>(res, createdGuest);
    } catch (error) {
      next(error);
    }
  }
);

guestRouter.get(
  '/:guestId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const guestId: string = req.params?.guestId || '';
      const guestEntity = await getGuest(guestId);

      sendEntityDataResponse<GuestEntity>(res, guestEntity);
    } catch (error) {
      next(error);
    }
  }
);

guestRouter.delete(
  '/:guestId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const guestId: string = req.params?.guestId || '';
      const removeResponseData = await removeGuest(guestId);

      sendDataResponse<RemoveResponseData>(res, removeResponseData);
    } catch (error) {
      next(error);
    }
  }
);

guestRouter.get(
  '/',
  async (
    req: ValidatedRequest<EditGuestRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { inviteGroup } = req.query;
      const guestEntities = await getAllGuests(inviteGroup);

      sendEntityDataResponse<GuestEntity[]>(res, guestEntities);
    } catch (error) {
      next(error);
    }
  }
);

guestRouter.put(
  '/',
  validator.body(editGuestBodySchema),
  async (
    req: ValidatedRequest<EditGuestRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { admin } = req as AuthValidatedRequest<CreateGuestRequestSchema>;
      const editGuestParam: EditGuestRequestBody = req.body;
      const editedGuest = await editGuest(editGuestParam, admin);

      sendEntityDataResponse<GuestEntity>(res, editedGuest);
    } catch (error) {
      next(error);
    }
  }
);

export { guestRouter };
