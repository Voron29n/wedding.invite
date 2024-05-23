import { Entity, Enum, Property } from '@mikro-orm/core';
import { UserEntity } from '@src/entities/user.entity';
import { StartPlace } from '@src/types/surveyResponses.type';

@Entity({
  tableName: 'survey_responses'
})
export class SurveyResponsesEntity extends UserEntity {
  @Property({ default: [] })
  presentGuests: string[];

  @Enum(() => StartPlace)
  startPlace: StartPlace;

  @Property()
  isPrivateTransport: boolean;

  @Property({ default: [] })
  presentOnSecondDay: string[];

  @Property({ default: false })
  needSleepPlace: boolean;

  @Property({ default: [] })
  likeDrinks: string[];

  constructor(
    presentGuests: string[],
    startPlace: StartPlace,
    isPrivateTransport: boolean,
    presentOnSecondDay: string[],
    needSleepPlace: boolean,
    likeDrinks: string[]
  ) {
    super();
    this.presentGuests = presentGuests;
    this.startPlace = startPlace;
    this.isPrivateTransport = isPrivateTransport;
    this.presentOnSecondDay = presentOnSecondDay;
    this.needSleepPlace = needSleepPlace;
    this.likeDrinks = likeDrinks;
  }
}
