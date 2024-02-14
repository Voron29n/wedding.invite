import { EntityDTO, wrap } from '@mikro-orm/core';
import { Response } from 'express';

import { ERROR_MESSAGES } from '@const';
import { InternalServerError } from '@errors';
import { ErrorResponse, ResponseEntity, Role } from '@types';

import { DI } from './index';

const wrapEntityToJSON = <Type>(entity: Type, authRole: Role) =>
  wrap(entity).toJSON(authRole);

export const sendEntityDataResponse = <Type>(
  res: Response,
  entity: Type,
  authRole: Role = Role.admin
): void =>
  Array.isArray(entity)
    ? sendDataResponse<EntityDTO<Type>[]>(
        res,
        entity.map(entity => wrapEntityToJSON(entity, authRole))
      )
    : sendDataResponse<EntityDTO<Type>>(
        res,
        wrapEntityToJSON(entity, authRole)
      );

export const sendDataResponse = <Type>(res: Response, data: Type): void => {
  const dataResponse: ResponseEntity<Type> = {
    data,
    error: null
  };

  res.json(dataResponse).end();
};

export const sendErrorResponse = <Type>(
  res: Response,
  { statusCode, message }: ErrorResponse
): void => {
  const errorResponse: ResponseEntity<Type> = {
    data: null,
    error: {
      message
    }
  };

  res.statusCode = statusCode;
  res.json(errorResponse).end();
};
export const executeDbLogError = async <Type>(
  dbFunction: Function
): Promise<Type> => {
  try {
    return await dbFunction();
  } catch (error) {
    DI.logger.error(`Error during db operation: ${error}`);
    throw new InternalServerError(ERROR_MESSAGES.DB_FAILED);
  }
};
