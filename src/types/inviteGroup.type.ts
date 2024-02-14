import { GuestType } from './guest.type';
import { InvitationType } from './invitation.type';

type InviteGroupType = {
  id: string;
  groupName: string;
  guests: GuestType[];
  invitation: InvitationType;
};

type CreateInviteGroupRequestBody = {
  groupName: string;
  guests: string[];
  invitation: InvitationType;
};

type EditInviteGroupRequestBody = {
  id: string;
  groupName?: string;
  updateGuests?: { [key: string]: boolean };
  invitation?: InvitationType;
};

export type {
  InviteGroupType,
  CreateInviteGroupRequestBody,
  EditInviteGroupRequestBody
};
