import {
  AdminEntity,
  GuestEntity,
  InvitationEntity,
  InviteGroupEntity
} from '@entities';
import { AdminType, GuestType, InvitationType, InviteGroupType } from '@types';

export const transformAdminToRespType = ({
  id,
  password,
  email,
  role
}: AdminEntity): AdminType => ({
  id,
  password,
  email,
  role
});

export const transformGuestToRespType = ({
  id,
  firstName,
  lastName,
  side,
  isAdult,
  inviteId
}: GuestEntity): GuestType => ({
  id,
  firstName,
  lastName,
  side,
  isAdult,
  inviteId: inviteId || ''
});
