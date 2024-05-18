import { ObjectId } from '@mikro-orm/mongodb';

import { InviteGroupEntity } from '@entities';
import { DI } from '../index';
import { executeDbLogError } from '../utils';

export const getInviteGroupByGuestId = async (
  guestId: string
): Promise<InviteGroupEntity | null> =>
  executeDbLogError<InviteGroupEntity | null>(() =>
    DI.inviteGroupRepository.findOne({
      guests: {
        _id: new ObjectId(guestId)
      }
    })
  );

export const getAllInviteGroups = async (): Promise<
  InviteGroupEntity[] | null
> =>
  executeDbLogError<InviteGroupEntity[] | null>(() =>
    DI.inviteGroupRepository.findAll({ populate: ['guests', 'invitation'] })
  );

export const getInviteGroupById = async (
  id: string
): Promise<InviteGroupEntity | null> =>
  executeDbLogError<InviteGroupEntity | null>(() =>
    DI.inviteGroupRepository.findOne(
      { _id: new ObjectId(id) },
      { populate: ['guests', 'invitation'] }
    )
  );

export const getInviteGroupByGroupName = async (
  groupName: string
): Promise<InviteGroupEntity | null> =>
  executeDbLogError<InviteGroupEntity | null>(() =>
    DI.inviteGroupRepository.findOne({ groupName })
  );

export const saveInviteGroupToDB = async (
  inviteGroup: InviteGroupEntity
): Promise<void> =>
  executeDbLogError<void>(() => DI.em.persistAndFlush(inviteGroup));

export const removeInviteGroupFromDB = async (
  inviteGroup: InviteGroupEntity
): Promise<void> =>
  executeDbLogError<void>(() => DI.em.remove(inviteGroup).flush());
