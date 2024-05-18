import { wrap } from '@mikro-orm/core';

import { ERROR_MESSAGES } from '@const';
import { AdminEntity, InvitationEntity, InviteGroupEntity } from '@entities';
import { InternalServerError } from '@errors';
import { DI } from '@src/index';
import {
  getAllInviteGroups,
  getGuestsByIds,
  getInviteGroupByGroupName,
  getInviteGroupById,
  removeInviteGroupFromDB,
  saveInviteGroupToDB
} from '@repository';
import {
  CreateInviteGroupRequestBody,
  EditInviteGroupRequestBody,
  RemoveResponseData
} from '@types';

const {
  inviteGroup: {
    INVITE_GROUP_ALREADY_EXIST,
    INVITE_GROUP_SAVING_ERROR,
    INVITE_GROUP_NOT_EXISTED
  }
} = ERROR_MESSAGES;

export const getInviteGroup = async (
  id: string
): Promise<InviteGroupEntity> => {
  const inviteGroup = await getInviteGroupById(id);

  if (!inviteGroup) {
    throw new InternalServerError(INVITE_GROUP_NOT_EXISTED);
  }

  return inviteGroup;
};

export const getInviteGroups = async (): Promise<InviteGroupEntity[]> =>
  (await getAllInviteGroups()) || [];

export const createInviteGroup = async (
  { groupName, guests, invitation }: CreateInviteGroupRequestBody,
  createdBy: AdminEntity
): Promise<InviteGroupEntity> => {
  const isInviteGroupExist = !!(await getInviteGroupByGroupName(groupName));

  if (isInviteGroupExist) {
    throw new InternalServerError(INVITE_GROUP_ALREADY_EXIST);
  }

  const guestsEntity = (await getGuestsByIds(guests)) || [];
  const newInviteGroup = new InviteGroupEntity(
    groupName,
    guestsEntity,
    new InvitationEntity(invitation.checkSlip, invitation.checkTransport),
    createdBy
  );

  await saveInviteGroupEntity(newInviteGroup);

  return newInviteGroup;
};

const updateInviteGroupGuests = async (
  updateGuests: { [p: string]: boolean } | undefined,
  inviteGroup: InviteGroupEntity
) => {
  const updatedGuests = {
    added: [],
    removed: []
  } as { added: string[]; removed: string[] };

  Object.entries(updateGuests || {}).forEach(([guestId, isAdded]) =>
    updatedGuests[isAdded ? 'added' : 'removed'].push(guestId)
  );

  if (updatedGuests.added.length) {
    const guestsEntity =
      (updatedGuests.added && (await getGuestsByIds(updatedGuests.added))) ||
      [];

    if (guestsEntity.length) {
      inviteGroup.guests.add(guestsEntity);
    }
  }

  if (updatedGuests.removed.length) {
    updatedGuests.removed.forEach(guestId =>
      inviteGroup.guests.remove(item => item.id === guestId)
    );
  }
};

export const removeInviteGroup = async (
  id: string
): Promise<RemoveResponseData> => {
  const inviteGroup = await getInviteGroupById(id);

  if (!inviteGroup) {
    throw new InternalServerError(INVITE_GROUP_NOT_EXISTED);
  }

  await removeInviteGroupEntity(inviteGroup);

  return Promise.resolve({ success: true });
};

export const editInviteGroup = async (
  { id, groupName, updateGuests, invitation }: EditInviteGroupRequestBody,
  modifyBy: AdminEntity
): Promise<InviteGroupEntity> => {
  const inviteGroup = await getInviteGroupById(id);

  if (!inviteGroup) {
    throw new InternalServerError(INVITE_GROUP_NOT_EXISTED);
  }

  await updateInviteGroupGuests(updateGuests, inviteGroup);

  wrap(inviteGroup).assign(
    {
      groupName: groupName || inviteGroup.groupName,
      invitation: { ...invitation } || inviteGroup.invitation,
      modifyBy
    },
    { updateByPrimaryKey: false }
  );

  await saveInviteGroupEntity(inviteGroup);

  return inviteGroup;
};

const saveInviteGroupEntity = async (
  inviteGroup: InviteGroupEntity
): Promise<void> => {
  try {
    await saveInviteGroupToDB(inviteGroup);
    DI.logger.debug(`InviteGroup was saved to db invite_group: ${inviteGroup}`);

    return Promise.resolve();
  } catch (_error) {
    throw new InternalServerError(INVITE_GROUP_SAVING_ERROR);
  }
};

const removeInviteGroupEntity = async (
  inviteGroup: InviteGroupEntity
): Promise<void> => {
  try {
    const inviteGroupJson = JSON.stringify(inviteGroup);
    await removeInviteGroupFromDB(inviteGroup);
    DI.logger.debug(
      `InviteGroup was removed from db invite_group: ${inviteGroupJson}`
    );

    return Promise.resolve();
  } catch (_error) {
    throw new InternalServerError(INVITE_GROUP_SAVING_ERROR);
  }
};
