import * as JoiExtract from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import 'joi-extract-type';

import { GuestGender, GuestSide } from '@types';

const createGuestBodySchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  side: Joi.valid(...Object.values(GuestSide)).required(),
  gender: Joi.valid(...Object.values(GuestGender)).required(),
  isAdult: Joi.boolean().required()
});

const editGuestBodySchema = Joi.object({
  id: Joi.string().required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  gender: Joi.string().optional(),
  side: Joi.valid(...Object.values(GuestSide)).optional(),
  isAdult: Joi.boolean().optional()
});

const getGuestsBySchema = Joi.object({
  inviteGroup: Joi.string().optional()
});

interface CreateGuestRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JoiExtract.extractType<typeof createGuestBodySchema>;
}

interface GetGuestsByRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: JoiExtract.extractType<typeof getGuestsBySchema>;
}

interface EditGuestRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JoiExtract.extractType<typeof editGuestBodySchema>;
}

export { createGuestBodySchema, editGuestBodySchema, getGuestsBySchema };

export type {
  CreateGuestRequestSchema,
  EditGuestRequestSchema,
  GetGuestsByRequestSchema
};
