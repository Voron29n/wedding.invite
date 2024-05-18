import * as JoiExtract from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import 'joi-extract-type';

const createInviteGroupBodySchema = Joi.object({
  groupName: Joi.string().required(),
  guests: Joi.array().items(Joi.string()).min(0).required(),
  invitation: Joi.object({
    checkSlip: Joi.boolean().required(),
    checkTransport: Joi.boolean().required()
  }).required()
});

const editInviteGroupBodySchema = Joi.object({
  id: Joi.string().required(),
  groupName: Joi.string().optional(),
  updateGuests: Joi.object().required(),
  invitation: Joi.object({
    checkSlip: Joi.boolean().required(),
    checkTransport: Joi.boolean().required()
  }).optional()
});

interface CreateInviteGroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JoiExtract.extractType<
    typeof createInviteGroupBodySchema
  >;
}

interface EditInviteGroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JoiExtract.extractType<
    typeof editInviteGroupBodySchema
  >;
}

export { createInviteGroupBodySchema, editInviteGroupBodySchema };

export type { CreateInviteGroupRequestSchema, EditInviteGroupRequestSchema };
