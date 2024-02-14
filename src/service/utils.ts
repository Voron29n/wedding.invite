import { sign, verify } from 'jsonwebtoken';

import { ERROR_MESSAGES } from '@const';
import { UserEntity } from '@entities';
import { NotAuthorisedError } from '@errors';
import { TokenPayload, UserType } from '@types';

export const validateToken = (token: string): TokenPayload => {
  try {
    return verify(token, process.env.TOKEN_KEY!) as TokenPayload;
  } catch (err) {
    throw new NotAuthorisedError(ERROR_MESSAGES.INVALID_TOKEN);
  }
};

export const createAuthResponse = (user: UserEntity) => {
  const accessToken = sign(
    {
      id: user.id,
      role: user.role
    } as UserType,
    process.env.TOKEN_KEY!,
    {
      expiresIn: process.env.TOKEN_EXPIRES_IN!
    }
  );
  const date = new Date();
  const expirationTime = new Date(date.setHours(date.getHours() + 2)).toJSON();

  return {
    accessToken,
    expirationTime
  };
};
