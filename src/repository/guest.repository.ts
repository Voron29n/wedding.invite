import { ObjectId } from '@mikro-orm/mongodb';

import { GuestEntity } from '@entities';
import { DI } from '../index';
import { executeDbLogError } from '../utils';

export const getAllGuestsFromDB = async (): Promise<GuestEntity[] | null> =>
  executeDbLogError<GuestEntity[] | null>(() =>
    DI.guestRepository.findAll({ populate: ['createdBy', 'modifyBy'] })
  );

export const getAllGuestsFromDBByInviteGroup = async (
  inviteGroupId: string
): Promise<GuestEntity[] | null> =>
  executeDbLogError<GuestEntity[] | null>(() =>
    DI.guestRepository.find(
      {
        inviteGroup: inviteGroupId
          ? { _id: new ObjectId(inviteGroupId) }
          : { $eq: null }
      },
      { populate: ['createdBy', 'modifyBy'] }
    )
  );

export const getGuestsByIds = async (
  ids: string[]
): Promise<GuestEntity[] | null> =>
  executeDbLogError<GuestEntity[] | null>(() =>
    DI.guestRepository.find(
      {
        _id: { $in: ids.map(id => new ObjectId(id)) }
      },
      { populate: ['createdBy', 'modifyBy'] }
    )
  );

export const getGuestById = async (id: string): Promise<GuestEntity | null> =>
  executeDbLogError<GuestEntity | null>(() =>
    DI.guestRepository.findOne(
      { _id: new ObjectId(id) },
      { populate: ['createdBy', 'modifyBy'] }
    )
  );

export const getGuestByInviteId = async (
  inviteId: string
): Promise<GuestEntity | null> =>
  executeDbLogError<GuestEntity | null>(() =>
    DI.guestRepository.findOne({ inviteId })
  );

export const getGuestByFirstLastName = async (
  firstName: string,
  lastName: string
): Promise<GuestEntity | null> =>
  executeDbLogError<GuestEntity | null>(() =>
    DI.guestRepository.findOne({ firstName, lastName })
  );

export const saveGuestToDB = async (guest: GuestEntity): Promise<void> =>
  executeDbLogError<void>(() => DI.em.persist(guest).flush());

export const removeGuestFromDB = async (guest: GuestEntity): Promise<void> =>
  executeDbLogError<void>(() => DI.em.remove(guest).flush());
