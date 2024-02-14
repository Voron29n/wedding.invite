import { UserType } from './user.type';

enum GuestSide {
  wife = 'wife',
  husband = 'husband'
}

type Guest = UserType & {
  firstName: string;
  lastName: string;
  side: GuestSide;
  isAdult: boolean;
  inviteId: string;
};

type GuestType = Omit<Guest, 'role'>;

export type CreateGuestRequestBody = Pick<
  Guest,
  'firstName' | 'lastName' | 'isAdult' | 'side'
>;

type EditGuestRequestBody = { id: string } & Partial<CreateGuestRequestBody>;

type LoginGuestRequestBody = Pick<Guest, 'inviteId'>;

export { GuestSide };

export type { GuestType, EditGuestRequestBody, LoginGuestRequestBody };
