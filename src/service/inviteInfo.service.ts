import { GuestEntity, InviteGroupEntity } from '@entities';
import { InternalServerError } from '@errors';
import { ERROR_MESSAGES } from '@const';
import { DI } from '@src/index';

const {
  inviteGroup: { INVITE_GROUP_NOT_EXISTED }
} = ERROR_MESSAGES;

export const getInviteInfo = async (
  guest: GuestEntity
): Promise<InviteGroupEntity> => {
  await DI.em.populate(guest, ['inviteGroup']);
  const inviteGroup = guest.inviteGroup as InviteGroupEntity;

  if (!inviteGroup) {
    throw new InternalServerError(INVITE_GROUP_NOT_EXISTED);
  }

  return inviteGroup;
};
