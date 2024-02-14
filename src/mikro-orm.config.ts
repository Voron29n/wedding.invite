import { Options } from '@mikro-orm/core';
import { MongoDriver } from '@mikro-orm/mongodb';
import dotenv from 'dotenv';

dotenv.config();

const microOrmConfig: Options<MongoDriver> = {
  entities: ['./dist/entities/**/*.js'],
  entitiesTs: ['./src/entities/**/*.ts'],
  migrations: {
    path: './dist/migrations',
    emit: 'ts'
  },
  dbName: process.env.DB_NAME!,
  clientUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/`,
  type: 'mongo',
  debug: process.env.NODE_ENV !== 'production'
};

export default microOrmConfig;
