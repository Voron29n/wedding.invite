import * as JoiExtract from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import 'joi-extract-type';
import { StartPlace } from '@src/types/surveyResponses.type';

const surveyResponsesBodySchema = Joi.object({
  presentGuests: Joi.array().items(Joi.string()).min(0).required(),
  presentOnSecondDay: Joi.array().items(Joi.string()).min(0).required(),
  likeDrinks: Joi.array().items(Joi.string()).min(0).required(),
  startPlace: Joi.valid(...Object.values(StartPlace)).required(),
  transportation: Joi.string().required(),
  needSleepPlace: Joi.boolean().required()
});

interface SurveyResponsesRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JoiExtract.extractType<
    typeof surveyResponsesBodySchema
  >;
}

export { surveyResponsesBodySchema };

export type { SurveyResponsesRequestSchema };
