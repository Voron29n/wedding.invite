import dotenv from 'dotenv';
import winston, { Logger } from 'winston';

dotenv.config();

export const initLogger = (): Promise<Logger> =>
  new Promise<Logger>(resolve => {
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
      ]
    });

    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new winston.transports.Console({
          format: winston.format.simple()
        })
      );
    }

    resolve(logger);
  });
