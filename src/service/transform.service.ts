import { AdminEntity, GuestEntity } from '@entities';
import { AdminType, GuestType } from '@types';

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
  gender,
  isAdult,
  inviteId
}: GuestEntity): GuestType => ({
  id,
  firstName,
  lastName,
  side,
  gender,
  isAdult,
  inviteId: inviteId || ''
});
