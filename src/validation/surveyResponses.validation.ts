import * as JoiExtract from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import 'joi-extract-type';
import { StartPlace } from '@src/types/surveyResponses.type';

const surveyResponseBodySchema = Joi.object({
  presentGuests: Joi.array().items(Joi.string()).min(0).required(),
  presentOnSecondDay: Joi.array().items(Joi.string()).min(0).optional(),
  likeDrinks: Joi.array().items(Joi.string()).min(0).optional(),
  startPlace: Joi.valid(...Object.values(StartPlace)).optional(),
  isPrivateTransport: Joi.boolean().optional(),
  needSleepPlace: Joi.boolean().optional()
});

interface SurveyResponseRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JoiExtract.extractType<
    typeof surveyResponseBodySchema
  >;
}

export { surveyResponseBodySchema };

export type { SurveyResponseRequestSchema };
