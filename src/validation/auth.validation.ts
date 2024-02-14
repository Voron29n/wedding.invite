import * as JoiExtract from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import 'joi-extract-type';

import { VALIDATION } from '../const';
import { Role } from '@types';

const authorizationHeaderSchema = Joi.object({
  authorization: Joi.string().required()
});

interface AuthorizationRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Headers]: JoiExtract.extractType<
    typeof authorizationHeaderSchema
  >;
}

const loginAdminBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(VALIDATION.MIN_PASSWORD_LENGTH)
    .max(VALIDATION.MAX_PASSWORD_LENGTH)
    .required()
});

const loginGuestBodySchema = Joi.object({
  inviteId: Joi.string().required()
});

interface LoginAdminRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JoiExtract.extractType<typeof loginAdminBodySchema>;
}

interface LoginGuestRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JoiExtract.extractType<typeof loginGuestBodySchema>;
}

export {
  authorizationHeaderSchema,
  loginAdminBodySchema,
  loginGuestBodySchema
};

export type {
  AuthorizationRequestSchema,
  LoginAdminRequestSchema,
  LoginGuestRequestSchema
};
