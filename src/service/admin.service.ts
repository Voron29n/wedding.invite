import bcrypt from 'bcrypt';

import { ERROR_MESSAGES } from '@const';
import { AdminEntity } from '@entities';
import { BadRequestError, InternalServerError } from '@errors';
import { DI } from '@src/index';
import { getAdminByEmail, getAdminById, saveAdminToDB } from '@repository';
import { CreateAdminRequestBody, UserType } from '@types';

import { transformAdminToRespType } from './transform.service';

const {
  admin: { ADMIN_ALREADY_EXIST, ADMIN_NOT_EXISTED }
} = ERROR_MESSAGES;

export const getAdmin = async (uuid: string): Promise<AdminEntity> => {
  const admin = await getAdminById(uuid);

  if (!admin) {
    throw new InternalServerError(ADMIN_NOT_EXISTED);
  }

  return admin;
};

const saveUser = async (user: AdminEntity): Promise<void> => {
  try {
    await saveAdminToDB(user);
    DI.logger.debug(`User was saved to db User: ${user}`);

    return Promise.resolve();
  } catch (_error) {
    throw new InternalServerError(ERROR_MESSAGES.USER_CAN_NOT_SAVE);
  }
};

export const createAdmin = async ({
  email,
  password
}: CreateAdminRequestBody): Promise<UserType> => {
  const isUserExist = !!(await getAdminByEmail(email));

  if (isUserExist) {
    throw new BadRequestError(ADMIN_ALREADY_EXIST);
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = new AdminEntity(email.toLowerCase(), encryptedPassword);

  await saveUser(user);

  return transformAdminToRespType(user);
};
