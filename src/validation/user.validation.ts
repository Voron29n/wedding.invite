import * as JoiExtract from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';

import { Role } from '@types';

const userHeaderSchema = Joi.object({
  'x-user-id': Joi.string().uuid().required(),
  'x-user-role': Joi.valid(...Object.values(Role)).required()
});

interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Headers]: JoiExtract.extractType<typeof userHeaderSchema>;
}

export { userHeaderSchema };

export type { UserRequestSchema };
