import * as JoiExtract from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';

import { VALIDATION } from '@const';

const createAdminBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(VALIDATION.MIN_PASSWORD_LENGTH)
    .max(VALIDATION.MAX_PASSWORD_LENGTH)
    .required()
});

interface CreateAdminRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JoiExtract.extractType<typeof createAdminBodySchema>;
}

export { createAdminBodySchema };

export type { CreateAdminRequestSchema };
