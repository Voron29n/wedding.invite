import bcrypt from 'bcrypt';

import { ERROR_MESSAGES } from '@const';
import { AdminEntity, GuestEntity } from '@entities';
import { BadRequestError, NotAuthorisedError } from '@errors';
import {
  getAdminByEmail,
  getAdminById,
  getGuestById,
  getGuestByInviteId
} from '@repository';
import {
  LoginAdminRequestBody,
  LoginGuestRequestBody,
  LoginTokenData
} from '@types';
import { createAuthResponse } from './utils';

export const loginAdmin = async ({
  password,
  email
}: LoginAdminRequestBody): Promise<LoginTokenData> => {
  const admin = await getAdminByEmail(email);

  if (!admin || (await bcrypt.compare(admin.password, password))) {
    throw new BadRequestError(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  return {
    ...createAuthResponse(admin),
    user: {
      name: admin.email
    }
  };
};

export const loginGuest = async ({
  inviteId
}: LoginGuestRequestBody): Promise<LoginTokenData> => {
  const guest = await getGuestByInviteId(inviteId);

  if (!guest) {
    throw new BadRequestError(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  return {
    ...createAuthResponse(guest),
    user: {
      name: guest.firstName
    }
  };
};

export const getAdminByToken = async (id: string): Promise<AdminEntity> => {
  const admin: AdminEntity | null = await getAdminById(id);

  if (!admin) {
    throw new NotAuthorisedError(ERROR_MESSAGES.NOT_AUTHORIZED);
  }

  return admin;
};

export const getGuestByToken = async (id: string): Promise<GuestEntity> => {
  const guest: GuestEntity | null = await getGuestById(id);

  if (!guest) {
    throw new NotAuthorisedError(ERROR_MESSAGES.NOT_AUTHORIZED);
  }

  return guest;
};
