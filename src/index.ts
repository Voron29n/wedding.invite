import { Socket } from 'net';
import 'module-alias/register';

import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/mongodb';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { Logger } from 'winston';
import { AdminEntity, GuestEntity, InviteGroupEntity } from '@entities';

import { adminRouter, authRouter, guestRouter, inviteGroup } from '@controller';
import { authMiddleware, isAdmin, isGuest } from '@middleware';
import { errorMiddleware } from '@errors';
import { API } from '@const';
import {
  closeDB,
  createRequestContext,
  initDbData,
  initLogger
} from '@configuration';
import { healthCheckRouter } from './healthCheck';
import { inviteInfo } from '@src/controller/guest';
import * as console from 'node:console';

dotenv.config();

const app: Express = express();
const appPort = parseInt(process.env.APPLICATION_PORT!, 10);
export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<AdminEntity>;
  guestRepository: EntityRepository<GuestEntity>;
  inviteGroupRepository: EntityRepository<InviteGroupEntity>;
  logger: Logger;
};
let connections: Array<Socket> = [];

const startServer = async (logger: Logger) => {
  try {
    DI.logger = logger;

    await initDbData();

    app
      .use(createRequestContext)
      .use(express.json())
      .use(API.HEALTH, healthCheckRouter)
      .use(API.AUTH, authRouter)
      .use(authMiddleware)
      // Admin access routes
      .use(API.ADMIN_ACCESS.GUESTS, isAdmin, guestRouter)
      .use(API.ADMIN_ACCESS.ADMINS, isAdmin, adminRouter)
      .use(API.ADMIN_ACCESS.INVITE_GROUPS, isAdmin, inviteGroup)
      // Guest access routes
      .use(API.GUEST_ACCESS.INVITE_INFO, isGuest, inviteInfo)

      // Error handling middleware
      .use(errorMiddleware);

    const server = app.listen(appPort, () => {
      DI.logger.info(
        `⚡️[server]: Server is running at http://localhost:${appPort}`
      );
    });
    server.on('connection', (connection: Socket) => {
      connections.push(connection);

      connection.on('close', () => {
        connections = connections.filter(
          (currentConnection: Socket) => currentConnection !== connection
        );
      });
    });

    const shutdown = () => {
      DI.logger.info('Received kill signal, shutting down gracefully');

      server.close(async () => {
        await closeDB(false);
        DI.logger.info('Closed out remaining connections');
        process.exit(0);
      });

      setTimeout(
        async () => {
          await closeDB(true);
          DI.logger.error(
            'Could not close connections in time, forcefully shutting down'
          );
          process.exit(1);
        },
        parseInt(process.env.FORCE_SHUT_DOWN_TIMEOUT!, 10)
      );

      connections.forEach(connection => connection.end());

      setTimeout(
        () => {
          connections.forEach(connection => connection.destroy());
        },
        parseInt(process.env.DESTROY_CONNECTION_TIMEOUT!, 10)
      );
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (reason) {
    DI.logger.error(reason);
  }
};

initLogger().then(startServer).catch();
