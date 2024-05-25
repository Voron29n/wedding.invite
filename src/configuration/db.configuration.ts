import { RequestContext } from '@mikro-orm/core';
import { MikroORM, MongoDriver } from '@mikro-orm/mongodb';
import { NextFunction, Request, Response } from 'express';

import {
  AdminEntity,
  GuestEntity,
  InviteGroupEntity,
  SurveyResponsesEntity
} from '@entities';
import { DI } from '../index';
import microOrmConfig from '../mikro-orm.config';

const initDbData = async (): Promise<void> => {
  try {
    const orm = await MikroORM.init<MongoDriver>(microOrmConfig);
    DI.logger.info('⚡️[database]: DB is connected');

    const schema = orm.getSchemaGenerator();
    await schema.updateSchema();

    DI.orm = orm;
    DI.em = DI.orm.em;
    DI.userRepository = DI.orm.em.getRepository(AdminEntity);
    DI.guestRepository = DI.orm.em.getRepository(GuestEntity);
    DI.inviteGroupRepository = DI.orm.em.getRepository(InviteGroupEntity);
    DI.surveyResponsesRepository = DI.orm.em.getRepository(
      SurveyResponsesEntity
    );

    return Promise.resolve();
  } catch (e) {
    DI.logger.error('DB was not connected: ', e);
    return Promise.reject('DB error, server should stopped');
  }
};

const closeDB = async (isForceClose: boolean): Promise<void> => {
  try {
    const isConnected: boolean = await DI.orm.isConnected();

    if (isConnected) {
      await DI.orm.close(isForceClose);
      if (!isForceClose) {
        DI.logger.info('DB connection was closed');
      } else {
        DI.logger.error('DB connection was closed with force flag');
      }
    } else {
      DI.logger.info('DB connection is not active');
    }
  } catch (_error) {
    DI.logger.error('Failed to close DB connection');
  }
};

const createRequestContext = (
  req: Request,
  res: Response,
  next: NextFunction
) => RequestContext.create(DI.orm.em, next);

export { initDbData, closeDB, createRequestContext };
