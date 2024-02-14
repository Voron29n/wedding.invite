import { ObjectId } from '@mikro-orm/mongodb';

import { AdminEntity } from '@entities';
import { DI } from '../index';
import { executeDbLogError } from '../utils';

export const getAdminById = async (id: string): Promise<AdminEntity | null> =>
  executeDbLogError<AdminEntity | null>(() =>
    DI.userRepository.findOne({ _id: new ObjectId(id) })
  );

export const getAdminByEmail = async (
  email: string
): Promise<AdminEntity | null> =>
  executeDbLogError<AdminEntity | null>(() =>
    DI.userRepository.findOne({ email })
  );

export const saveAdminToDB = async (user: AdminEntity): Promise<void> =>
  executeDbLogError<void>(() => DI.em.persist(user).flush());
