import * as JoiExtract from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import 'joi-extract-type';

import { GuestSide } from '@types';

const createGuestBodySchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  side: Joi.valid(...Object.values(GuestSide)).required(),
  isAdult: Joi.boolean().required()
});

const editGuestBodySchema = Joi.object({
  id: Joi.string().required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  side: Joi.valid(...Object.values(GuestSide)).optional(),
  isAdult: Joi.boolean().optional()
});

interface CreateGuestRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JoiExtract.extractType<typeof createGuestBodySchema>;
}

interface EditGuestRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JoiExtract.extractType<typeof editGuestBodySchema>;
}

export { createGuestBodySchema, editGuestBodySchema };

export type { CreateGuestRequestSchema, EditGuestRequestSchema };
