import { AdminEntity, GuestEntity } from '@entities';
import { AuthAdminType, GuestType } from '@types';

export const transformAdminToRespType = ({
  id,
  password,
  email,
  role
}: AdminEntity): AuthAdminType => ({
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
