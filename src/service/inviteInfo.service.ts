import {
  GuestEntity,
  InviteGroupEntity,
  SurveyResponsesEntity
} from '@entities';
import { InternalServerError } from '@errors';
import { ERROR_MESSAGES } from '@const';
import { DI } from '@src/index';
import {
  StartPlace,
  SurveyResponsesBodyType
} from '@src/types/surveyResponses.type';
import { saveInviteGroupEntity } from '@src/service/inviteGroup.service';
import { wrap } from '@mikro-orm/core';
import { saveGuestToDB } from '@repository';

const {
  inviteGroup: { INVITE_GROUP_NOT_EXISTED }
} = ERROR_MESSAGES;

const defaultSurveyResponses = {
  startPlace: StartPlace.skip,
  isPrivateTransport: null,
  presentOnSecondDay: null,
  needSleepPlace: null,
  likeDrinks: null
};

const getInviteGroupForGuest = async (guest: GuestEntity) => {
  await DI.em.populate(guest, ['inviteGroup']);
  const inviteGroup = guest.inviteGroup as InviteGroupEntity;

  if (!inviteGroup) {
    throw new InternalServerError(INVITE_GROUP_NOT_EXISTED);
  }
  return inviteGroup;
};

export const getInviteInfo = async (
  guest: GuestEntity
): Promise<InviteGroupEntity> => {
  const inviteGroup = await getInviteGroupForGuest(guest);

  wrap(guest).assign({ lastSeenAt: new Date() }, { merge: true });

  await saveGuestToDB(guest);

  await DI.em.populate(inviteGroup, [
    'surveyResponses',
    'invitation',
    'guests'
  ]);

  return inviteGroup;
};

export const saveInviteInfoSurveyResponse = async (
  guest: GuestEntity,
  surveyResponses: SurveyResponsesBodyType
): Promise<InviteGroupEntity> => {
  const inviteGroup = await getInviteGroupForGuest(guest);

  await DI.em.populate(inviteGroup, ['surveyResponses']);

  if (inviteGroup.surveyResponses) {
    wrap(inviteGroup.surveyResponses).assign(
      {
        modifyBy: guest,
        ...defaultSurveyResponses,
        ...surveyResponses
      },
      { updateByPrimaryKey: false, merge: false }
    );
  } else {
    inviteGroup.surveyResponses = new SurveyResponsesEntity({
      inviteGroup,
      createdBy: guest,
      ...defaultSurveyResponses,
      ...surveyResponses
    });
  }

  await saveInviteGroupEntity(inviteGroup);

  return inviteGroup;
};
