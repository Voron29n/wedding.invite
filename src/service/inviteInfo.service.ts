import { InviteGroupEntity } from '@entities';
import { getInviteGroupByGuestId } from '@repository';
import { InternalServerError } from '@errors';
import { ERROR_MESSAGES } from '@const';

const {
  inviteGroup: { INVITE_GROUP_NOT_EXISTED }
} = ERROR_MESSAGES;

export const getInviteInfo = async (
  guestId: string
): Promise<InviteGroupEntity> => {
  const inviteGroup = await getInviteGroupByGuestId(guestId);

  if (!inviteGroup) {
    throw new InternalServerError(INVITE_GROUP_NOT_EXISTED);
  }

  return inviteGroup;
};
