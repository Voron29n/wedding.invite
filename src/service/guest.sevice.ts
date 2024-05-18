import { AdminEntity, GuestEntity } from '@entities';
import { ERROR_MESSAGES } from '@const';
import { CreateGuestRequestBody, EditGuestRequestBody } from '@types';
import { DI } from '../index';
import {
  getAllGuestsFromDB,
  getAllGuestsFromDBByInviteGroup,
  getGuestByFirstLastName,
  getGuestById,
  removeGuestFromDB,
  saveGuestToDB
} from '@repository';
import { wrap } from '@mikro-orm/core';
import { BadRequestError, InternalServerError } from '@errors';

const {
  guest: { GUEST_ALREADY_EXIST, GUEST_NOT_EXISTED, GUEST_SAVING_ERROR }
} = ERROR_MESSAGES;

export const getGuest = async (uuid: string): Promise<GuestEntity> => {
  const guest = await getGuestById(uuid);

  if (!guest) {
    throw new InternalServerError(GUEST_NOT_EXISTED);
  }

  return guest;
};

export const getAllGuests = async (
  inviteGroup: string
): Promise<GuestEntity[]> => {
  if (!inviteGroup) {
    return (await getAllGuestsFromDB()) || [];
  }

  return (
    (await getAllGuestsFromDBByInviteGroup(
      inviteGroup === 'empty' ? '' : inviteGroup
    )) || []
  );
};

export const removeGuest = async (uuid: string): Promise<GuestEntity> => {
  const guest = await getGuest(uuid);

  await removeGuestEntity(guest);

  return guest;
};

export const editGuest = async (
  { id, ...editBody }: EditGuestRequestBody,
  modifyBy: AdminEntity
): Promise<GuestEntity> => {
  const guest = await getGuestById(id);

  if (!guest) {
    throw new InternalServerError(GUEST_NOT_EXISTED);
  }

  wrap(guest).assign({
    ...editBody,
    modifyBy
  });

  await saveGuest(guest);

  return guest;
};

export const createGuest = async (
  { firstName, lastName, side, gender, isAdult }: CreateGuestRequestBody,
  createdBy: AdminEntity
): Promise<GuestEntity> => {
  const isGuestExist = !!(await getGuestByFirstLastName(firstName, lastName));

  if (isGuestExist) {
    DI.logger.error(
      'Failed saving guest. Guest with provided data already exists'
    );
    throw new BadRequestError(GUEST_ALREADY_EXIST);
  }

  const guest = new GuestEntity(
    firstName,
    lastName,
    side,
    gender,
    isAdult,
    createdBy
  );

  await saveGuest(guest);

  return guest;
};

const saveGuest = async (guest: GuestEntity): Promise<void> => {
  try {
    await saveGuestToDB(guest);
    DI.logger.debug(`Guest was saved to db Guest: ${guest}`);

    return Promise.resolve();
  } catch (_error) {
    throw new InternalServerError(GUEST_SAVING_ERROR);
  }
};

const removeGuestEntity = async (guest: GuestEntity): Promise<void> => {
  try {
    await removeGuestFromDB(guest);
    DI.logger.debug(`Guest was removed from db Guest: ${guest}`);

    return Promise.resolve();
  } catch (_error) {
    throw new InternalServerError(GUEST_SAVING_ERROR);
  }
};
