import { GuestEntity, InviteGroupEntity } from '@entities';

export enum StartPlace {
  church = 'church',
  manor = 'manor',
  skip = 'skip'
}

export type SurveyResponsesType = {
  inviteId: string;
  createdBy: GuestEntity;
  inviteGroup: InviteGroupEntity;
  presentGuests: string[];
  startPlace: StartPlace;
  isPrivateTransport: boolean | null;
  presentOnSecondDay: string[] | null;
  needSleepPlace: boolean | null;
  noAlonePresent: boolean | null;
  noAloneOnSecondDay: boolean | null;
  likeDrinks: string[] | null;
};

export type SurveyResponsesBodyType = Omit<
  SurveyResponsesType,
  'inviteGroup' | 'createdBy'
>;
